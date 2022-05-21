import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../weather.service";
import {Weather} from "../weather.model";

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {
  forecasts: Weather[] = [];

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    let cityName = "London"
    this.weatherService.getFiveDayForecast("cityName").subscribe(
      resData => {
        for (let i = 0; i < 5; i++) {
          // @ts-ignore
          console.log(resData["list"][i])
          // @ts-ignore
          const date: Date = resData["list"][i].dt_txt;
          // @ts-ignore
          const icon: String = "http://openweathermap.org/img/w/" + resData["list"][i].weather[0].icon + ".png";
          // @ts-ignore
          const tempMin: String = resData["list"][i].main.temp_min;
          // @ts-ignore
          const tempMax: String = resData["list"][i].main.temp_max;
          const forecast: Weather = new Weather("London", icon, date, tempMax, tempMin);
          this.forecasts.push(forecast)
        }
        console.log(this.forecasts)
      }
    );
  }

}
