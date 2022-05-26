import { Injectable } from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {Observable, of, Subject, tap} from "rxjs";
import {Forecast} from "./forecast.model";

export interface Coord {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface RootObject {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}


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

  getCityWeather(city: string) {
    this.dataStorageService.getCityWeather(city).subscribe(
      (resData: RootObject) => {
        const rootObject: RootObject = resData
        const name : string = rootObject.name
        const temp : number = rootObject.main.temp - 274.15;
        const wind : number = rootObject.wind.speed;
        const humidity: number = rootObject.main.humidity;
        const icon = `http://openweathermap.org/img/wn/${rootObject.weather[0].icon}@2x.png`;

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
