import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {RootObject} from "../weather/root-object.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient) {
  }

  getFiveDayForecast(city: string) {
    return this.http.get(`${environment.openWeatherSpecificCityUrl}${city}&APPID=${environment.apiKey}9`)
  }

  getCityWeather(city: String): Observable<RootObject> {
    return this.http.get<RootObject>(`${environment.openWeatherSpecificCityUrl}${city}&APPID=${environment.apiKey}`)
  }
}
