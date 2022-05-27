import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {WeatherComponent} from "./weather/weather.component";
import {WeatherDetailsComponent} from "./weather/weather-details/weather-details.component";
import {AuthGuard} from "./auth/auth.guard";


const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'weather', component: WeatherComponent, canActivate: [AuthGuard]},
  {path: 'weather/:cityName', component: WeatherDetailsComponent}]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
