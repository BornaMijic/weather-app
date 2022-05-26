import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {RootObject} from "../weather/weather.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient) {
  }

  getCityWeather(city: String) {
    return this.http.get<RootObject>(environment.openWeatherSpecificCityUrl + city + '&APPID=' + environment.apiKey)
  }
}
