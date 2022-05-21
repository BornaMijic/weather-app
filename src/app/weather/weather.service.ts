import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey: string = "1eafa79098796a04151a38fb2c7f2499";

  constructor(private http: HttpClient) {
  }

  getCityWeather(city: String) {
    return this.http.get(environment.openWeatherSpecificCityUrl + city + '&APPID=' + environment.apiKey);
  }

}
