import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  error: string = "";

  constructor(private authService: AuthService) { }

  onSubmit(authForm: NgForm) {
    this.authService.login(authForm.value.email, authForm.value.password)
    authForm.reset()
  }

}
