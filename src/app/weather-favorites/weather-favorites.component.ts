import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from "../weather/weather.service";
import {Forecast} from "../weather/forecast.model";
import {FormArray} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-weather-favorites',
  templateUrl: './weather-favorites.component.html',
  styleUrls: ['./weather-favorites.component.css']
})
export class WeatherFavoritesComponent implements OnInit,OnDestroy {
  weathersFavorites: Forecast[] = [];
  cities: string[] = [];
  favoriteWeathers: FormArray = new FormArray([]);
  private subscription: Subscription = new Subscription();
  readonly NUMBER_FORMAT: string = '1.2-2';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
      this.weathersFavorites = this.weatherService.getFavoriteWeathers();
    let subscription = this.weatherService.weatherFavoriteSubject.subscribe(
      (forecastsFavoriteData: Forecast[]) => {
        this.weathersFavorites= forecastsFavoriteData;
      }
    );
    this.subscription.add(subscription)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
