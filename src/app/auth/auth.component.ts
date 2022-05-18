import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  login: boolean = false;
  error: string = '';
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(authForm: NgForm) {
    const subscription = this.authService.login(authForm.value.email, authForm.value.password).subscribe(
      resData => {
        this.login = true;
        if (this.login) {
          this.router.navigate(['weather'])
        }
      },
      errorMes =>
        this.error = errorMes
    )
    this.subscription.add(subscription)
    authForm.reset()
    this.login = false;
  }

}
