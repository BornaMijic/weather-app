import { Injectable } from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {Observable, of, Subject, tap} from "rxjs";
import {Forecast} from "./forecast.model";
import {RootObject} from "./root-object.model";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherSubject: Subject<Forecast[]> = new Subject<Forecast[]>()
  weathers: Forecast[] = [];
  errorSubject: Subject<string> = new Subject<string>();
  cities: string[] = []


  constructor(private dataStorageService: DataStorageService) {
  }

  getSearchedCityNames(): Observable<string[]> {
    return of(this.cities)
  }

  getCityWeather(city: string): void {
    this.dataStorageService.getCityWeather(city).subscribe(
      (resData: RootObject) => {
        const rootObject: RootObject = resData
        const name : string = rootObject.name
        const temp : number = rootObject.main.temp - 274.15;
        const wind : number = rootObject.wind.speed;
        const humidity: number = rootObject.main.humidity;
        const icon = `${environment.openWeatherImageURL}/img/wn/${rootObject.weather[0].icon}@2x.png`;

        const weather: Forecast = new Forecast(name, temp, icon, wind, humidity);
        this.weathers.push(weather)
        this.cities.push(city.toLowerCase());
        this.weatherSubject.next(this.weathers);
        this.errorSubject.next("");
      },
      error => {
        this.errorSubject.next("There is no city with that name");
      }
    )
  }

}
