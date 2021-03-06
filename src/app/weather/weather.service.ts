import { Injectable } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { Observable, of, Subject, tap } from 'rxjs';
import { Forecast } from './forecast.model';
import { RootObject } from './root-object.model';
import { environment } from '../../environments/environment.prod';
import { RootObjectFiveDay } from './weather-details/root-object-five-day.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  weatherSubject: Subject<Forecast[]> = new Subject<Forecast[]>();
  weathers: Forecast[] = [];
  errorSubject: Subject<string> = new Subject<string>();
  cities: string[] = [];
  favoriteCities: string[] = [];
  favoriteWeathersSubject: Subject<Forecast[]> = new Subject<Forecast[]>();
  favoriteWeathers: Forecast[] = [];

  constructor(private dataStorageService: DataStorageService) {}

  getSearchedCityNames(): Observable<string[]> {
    return of(this.cities);
  }

  getFavoriteCities(): Observable<string[]> {
    const value = localStorage.getItem('favorite_cities');
    if (typeof value === 'string') {
      this.favoriteCities = JSON.parse(value);
    }
    return of(this.favoriteCities);
  }

  getCitiesWeathers(): Forecast[] {
    return this.weathers;
  }

  getFavoriteWeathers(): Forecast[] {
    const value = localStorage.getItem("favorite_weathers");
    if (typeof value === 'string') {
      this.favoriteWeathers = JSON.parse(value);
    }
    return this.favoriteWeathers;
  }

  getCityWeather(city: string): void {
    this.dataStorageService.getCityWeather(city).subscribe(
      (resData: RootObject) => {
        const rootObject: RootObject = resData;
        const name: string = rootObject.name;
        const temp: number = rootObject.main.temp - 274.15;
        const wind: number = rootObject.wind.speed;
        const humidity: number = rootObject.main.humidity;
        const icon = `${environment.openWeatherImageURL}/img/wn/${rootObject.weather[0].icon}@2x.png`;

        const weather: Forecast = new Forecast(
          name,
          icon,
          temp,
          wind,
          humidity
        );
        this.weathers.push(weather);
        this.cities.push(city.toLowerCase());
        this.weatherSubject.next(this.weathers);
        this.errorSubject.next('');
      },
      (error) => {
        this.errorSubject.next('There is no city with that name');
      }
    );
  }

  getFiveDayForecast(cityName: string): Observable<RootObjectFiveDay> {
    return this.dataStorageService.getFiveDayForecast(cityName);
  }

  getHourlyWeatherForecast(cityName: string): Observable<RootObjectFiveDay> {
    return this.dataStorageService.getHourlyWeatherForecast(cityName);
  }

  addFavorite(favoriteWeather: Forecast) {
    this.favoriteCities.push(favoriteWeather.cityName);
    this.favoriteWeathers.push(favoriteWeather);
    this.favoriteWeathersSubject.next(this.favoriteWeathers);
    localStorage.setItem('favorite_weathers', JSON.stringify(this.favoriteWeathers))
    localStorage.setItem('favorite_cities', JSON.stringify(this.favoriteCities))
  }

  deleteWeather(index: number): void {
    this.weathers.splice(index, 1);
    this.weatherSubject.next(this.weathers);
    this.cities.splice(index, 1);
  }

  removeFavorite(index: number): void {
    this.favoriteCities.splice(index, 1);
    this.favoriteWeathers.splice(index, 1);
    this.favoriteWeathersSubject.next(this.favoriteWeathers);
    localStorage.setItem('favorite_weathers', JSON.stringify(this.favoriteWeathers))
    localStorage.setItem('favorite_cities', JSON.stringify(this.favoriteCities))
  }

}
