import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getHourlyWeatherForecast(cityName: string) {
    return this.http.get("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=1eafa79098796a04151a38fb2c7f2499")
  }

}
