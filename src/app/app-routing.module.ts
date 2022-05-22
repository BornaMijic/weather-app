import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {WeatherComponent} from "./weather/weather.component";
import {
  WeatherDetailsHoursSpecificComponent
} from "./weather/weather-details/weather-details-hours-specific/weather-details-hours-specific.component";

const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'weather', component: WeatherComponent},
  {path: 'weather/:cityName/:day', component: WeatherDetailsHoursSpecificComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
