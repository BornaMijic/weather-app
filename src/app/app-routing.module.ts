import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {WeatherComponent} from "./weather/weather.component";

const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'weather', component: WeatherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
