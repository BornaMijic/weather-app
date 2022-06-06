import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from "../weather/weather.service";
import {Forecast} from "../weather/forecast.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-weather-favorites',
  templateUrl: './weather-favorites.component.html',
  styleUrls: ['./weather-favorites.component.css']
})
export class WeatherFavoritesComponent implements OnInit,OnDestroy {
  favoriteWeathers: Forecast[] = [];
  cities: string[] = [];
  private subscription: Subscription = new Subscription();
  readonly NUMBER_FORMAT: string = '1.0-0';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
      this.favoriteWeathers = this.weatherService.getFavoriteWeathers();
    let subscription = this.weatherService.favoriteWeathersSubject.subscribe(
      (forecastsFavoriteData: Forecast[]) => {
        this.favoriteWeathers = forecastsFavoriteData;
      }
    );
    this.subscription.add(subscription)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  removeFavorite(index: number): void {
    this.weatherService.removeFavorite(index)
  }

}
