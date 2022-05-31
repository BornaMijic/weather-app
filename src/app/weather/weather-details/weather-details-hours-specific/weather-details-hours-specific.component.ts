import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WeatherService} from "../../weather.service";
import {environment} from "../../../../environments/environment.prod";
import {List, RootObjectFiveDay} from "../root-object-five-day.model";
import {Forecast} from "../../forecast.model";

@Component({
  selector: 'app-weather-details-hours-specific',
  templateUrl: './weather-details-hours-specific.component.html',
  styleUrls: ['./weather-details-hours-specific.component.css']
})
export class WeatherDetailsHoursSpecificComponent implements OnInit {
  readonly NUMBER_FORMAT: string = '1.2-2';

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) {
  }

  hourlyWeather: Forecast[] = [];

  ngOnInit(): void {
    let cityName = this.route.snapshot.params['cityName'];
    let day = this.route.snapshot.params['day'];

    this.weatherService.getHourlyWeatherForecast(cityName).subscribe(
      (resData: RootObjectFiveDay) => {
        const listOfForecasts = resData.list;
        const weatherForSpecificDay = listOfForecasts.filter((weather: List) => {
          const date_hour: Date = new Date(weather.dt_txt);
          if (date_hour.toLocaleString('en-us', {weekday: 'short'}) === day) {
            return true;
          } else {
            return false;
          }
        })
        for(let i = 0; i < weatherForSpecificDay.length; ++i){
          const date: Date = new Date(weatherForSpecificDay[i].dt_txt);
          const icon: string = `${environment.openWeatherImageURL}/img/wn/${weatherForSpecificDay[i].weather[0].icon}@2x.png`;
          const tempMin: number = weatherForSpecificDay[i].main.temp_min - 274.15;
          const tempMax: number = weatherForSpecificDay[i].main.temp_max - 274.15;
          const temp: number = weatherForSpecificDay[i].main.temp - 274.15;
          const wind: number = weatherForSpecificDay[i].wind.speed;
          const humidity: number = weatherForSpecificDay[i].main.humidity;
          const forecast: Forecast = new Forecast(
            cityName,
            icon,
            temp,
            wind,
            humidity,
            tempMax,
            tempMin,
            date
          );
          this.hourlyWeather.push(forecast);
        }
      }
    );
  }


}
