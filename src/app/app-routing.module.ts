import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherDetailsHoursSpecificComponent } from './weather/weather-details/weather-details-hours-specific/weather-details-hours-specific.component';
import { WeatherDetailsComponent } from './weather/weather-details/weather-details.component';
import { AuthGuard } from './auth/auth.guard';
import {WeatherFavoritesComponent} from "./weather-favorites/weather-favorites.component";

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'weather', component: WeatherComponent, canActivate: [AuthGuard] },
  {
    path: 'weather/favorites',
    component: WeatherFavoritesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'weather/:cityName',
    component: WeatherDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'weather/:cityName/:day',
    component: WeatherDetailsHoursSpecificComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
