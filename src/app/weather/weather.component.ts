import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { WeatherService } from './weather.service';
import { Forecast } from './forecast.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit, OnDestroy {
  weathers: Forecast[] = [];
  cities: string[] = [];
  error: string = '';
  private subscription: Subscription = new Subscription();
  readonly NUMBER_FORMAT: string = '1.2-2';

  weatherForm!: FormGroup;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherForm = new FormGroup({
      citySearchName: new FormControl(null, [
        Validators.required,
        this.duplicateCity.bind(this),
      ]),
      citiesForecast: new FormArray([]),
    });

    let subscription = this.weatherService
      .getSearchedCityNames()
      .subscribe((resData: string[]) => {
        this.cities = resData;
      });

    this.subscription.add(subscription);

    this.weathers = this.weatherService.getCitiesWeathers();
    this.addFormArrayValues(this.weathers);
    subscription = this.weatherService.weatherSubject.subscribe(
      (forecastsData: Forecast[]) => {
        this.weathers = forecastsData;
        this.clearFormArray(<FormArray>this.weatherForm.get('citiesForecast'));
        this.addFormArrayValues(this.weathers);
      }
    );
    this.subscription.add(subscription);

    subscription = this.weatherService.errorSubject.subscribe(
      (error: string) => {
        this.error = error;
      }
    );
    this.subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get controls(): AbstractControl[] {
    return (<FormArray>this.weatherForm.get('citiesForecast')).controls;
  }

  private clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };

  duplicateCity(control: FormControl): { [p: string]: boolean } | null {
    const searchCity: string = control.value;
    if (this.weathers.length === 0 || searchCity == null) {
      return null;
    }
    for (let city of this.cities) {
      if (city == searchCity.toLowerCase()) {
        return { cityIsAlreadyAdded: true };
      }
    }
    return null;
  }

  addCity(): void {
    if (this.weathers.length == 9) {
      if (window.confirm('Are sure you want to add more than 10 cities?')) {
        this.weatherService.getCityWeather(
          this.weatherForm.controls['citySearchName'].value
        );
      }
    } else {
      this.weatherService.getCityWeather(
        this.weatherForm.controls['citySearchName'].value
      );
    }
    this.weatherForm.controls['citySearchName'].reset();
  }

  addFavorite(weatherCtrl: AbstractControl): void {
    let forecast: Forecast = new Forecast(weatherCtrl.value["cityName"],weatherCtrl.value['weatherIcon'],weatherCtrl.value["currentTemperature"],weatherCtrl.value["wind"],weatherCtrl.value["humidity"]);
    this.weatherService.addFavorite(forecast)
    this.error=''
  }

  private addFormArrayValues(weathers: Forecast[]) {
    for (let weather of weathers) {
      (<FormArray>this.weatherForm.get('citiesForecast')).push(
        new FormGroup({
          cityName: new FormControl(weather.cityName, Validators.required),
          weatherIcon: new FormControl(weather.icon),
          currentTemperature: new FormControl(weather.currentTemperature),
          humidity: new FormControl(weather.humidity),
          wind: new FormControl(weather.wind),
        })
      );
    }
  }
}
