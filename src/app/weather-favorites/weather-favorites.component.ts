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
  favoriteWeathers: Forecast[] = [];
  cities: string[] = [];
  favoriteWeathersArray: FormArray = new FormArray([]);
  private subscription: Subscription = new Subscription();
  readonly NUMBER_FORMAT: string = '1.2-2';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
      this.favoriteWeathers = this.weatherService.getFavoriteWeathers();
      console.log(this.favoriteWeathers)
    let subscription = this.weatherService.favoriteWeathersSubject.subscribe(
      (forecastsFavoriteData: Forecast[]) => {
        this.favoriteWeathers = forecastsFavoriteData;
        console.log(this.favoriteWeathers)
      }
    );
    this.subscription.add(subscription)
  }

  removeFavorite(index: number): void {
    this.weatherService.removeFavorite(index)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
