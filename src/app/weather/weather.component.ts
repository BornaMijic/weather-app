import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {WeatherService} from "./weather.service";
import {Weather} from "./weather.model";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
    weathers: Weather[] = [];
    error: String = "";
    subscription: Subscription = new Subscription();

    constructor(private weatherService: WeatherService) {
    }

  addCity(cityWeatherForm: NgForm) {
    const cityName: string = cityWeatherForm.value.cityName
    this.subscription = this.weatherService.getCityWeather(cityName).subscribe(
      resData =>{
        if(resData != null) {
          // @ts-ignore
          const temp = resData.main.temp
          // @ts-ignore
          const icon = `http://openweathermap.org/img/w/${resData.weather[0].icon}.png`;
          const weather: Weather = new Weather(cityName, temp, icon);
          // @ts-ignore
          console.log(resData.weather)
          this.weathers.push(weather);
          this.error = "";
          cityWeatherForm.reset()
        }
      },
      error => {
        this.error = "There is no city with that name";
        cityWeatherForm.reset()
      }
    );
  }
}
