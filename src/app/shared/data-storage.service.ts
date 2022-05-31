import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { RootObject } from '../weather/root-object.model';
import { Observable } from 'rxjs';
import { RootObjectFiveDay } from '../weather/weather-details/root-object-five-day.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  getFiveDayForecast(city: string): Observable<RootObjectFiveDay> {
    return this.http.get<RootObjectFiveDay>(
      `${environment.openWeatherSpecificCityUrl}forecast?q=${city}&APPID=${environment.apiKey}`
    );
  }

  getCityWeather(city: String): Observable<RootObject> {
    return this.http.get<RootObject>(
      `${environment.openWeatherSpecificCityUrl}weather?q=${city}&APPID=${environment.apiKey}`
    );
  }
}
