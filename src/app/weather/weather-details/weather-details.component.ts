import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { List, RootObjectFiveDay } from './root-object-five-day.model';
import { Subscription } from 'rxjs';
import { Forecast } from '../forecast.model';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css'],
})
export class WeatherDetailsComponent implements OnInit {
  forecasts: Forecast[] = [];
  readonly NUMBER_FORMAT: string = '1.2-2';
  readonly DATE: string = 'EEE';
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    let cityName = this.route.snapshot.params['cityName'];
    const subscription: Subscription = this.weatherService
      .getFiveDayForecast(cityName)
      .subscribe((resData: RootObjectFiveDay) => {
        this.setForecastsForFiveDays(resData);
      });
    this.subscription.add(subscription);
  }

  private setForecastsForFiveDays(resData: RootObjectFiveDay): void {
    for (let i = 0; i < 40; i = i + 8) {
      const cityName: string = resData.city.name;
      const listForecast: List = resData.list[i];
      const date: Date = new Date(listForecast.dt_txt);
      const icon: string = `${environment.openWeatherImageURL}/img/wn/${listForecast.weather[0].icon}@2x.png`;
      const tempMin: number = listForecast.main.temp_min - 274.15;
      const tempMax: number = listForecast.main.temp_max - 274.15;
      const temp: number = listForecast.main.temp - 274.15;
      const wind: number = listForecast.wind.speed;
      const humidity: number = listForecast.main.humidity;
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
      this.forecasts.push(forecast);
    }
  }
}
