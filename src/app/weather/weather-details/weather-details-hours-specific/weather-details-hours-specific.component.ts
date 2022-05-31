import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WeatherService} from "../../weather.service";
import {Weather} from "../../weather.model";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'app-weather-details-hours-specific',
  templateUrl: './weather-details-hours-specific.component.html',
  styleUrls: ['./weather-details-hours-specific.component.css']
})
export class WeatherDetailsHoursSpecificComponent implements OnInit {

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) {
  }

  hourlyWeather: Weather[] = [];

  ngOnInit(): void {
    let cityName = this.route.snapshot.params['cityName'];
    let day = this.route.snapshot.params['day'];

    this.weatherService.getHourlyWeatherForecast(cityName).subscribe(
      (resData) => {
        // @ts-ignore
        const listOfForecasts = resData['list'];
        const weatherForSpecificDay = listOfForecasts.filter((weather: any) => {
          const date_hour: Date = new Date(weather.dt_txt);
          if (date_hour.toLocaleString('en-us', {weekday: 'short'}) === day) {
            return true;
          } else {
            return false;
          }
        })
        this.hourlyWeather = weatherForSpecificDay.map((weather: any) => {
          const iconUrl: string = `${environment.openWeatherImageURL}/img/wn/${weather.weather[0].icon }@2x.png`;
          return new Weather(weather.dt_txt, iconUrl, weather.main.temp);
        })

      }
    );
  }


}
