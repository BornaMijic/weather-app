import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap, throwError} from "rxjs";
import {User} from "./user.model";
import {environment} from "../../environments/environment.prod";
import {Router} from "@angular/router";

export interface UserResposneData {
  idToken: string;
  email: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http.post<UserResposneData>(environment.signInUrl,{
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(tap(resData => {
      const user: User = new User(resData.localId, resData.email,resData.idToken,new Date(new Date().getTime() + Number(resData.expiresIn) * 1000));
      this.user.next(user);
      const xToken = user.email + resData.idToken;
      localStorage.setItem('X-token', JSON.stringify(xToken))
    }),catchError(this.handleError))
  }

  private handleError(error: any) {
    return throwError(() => {
      let errorMessage: string = "Unknown error has occurred";
      if(error.error.error.message == "EMAIL_NOT_FOUND" || error.error.error.message == "INVALID_PASSWORD" ) {
        errorMessage = "Invalid email or password";
      }
      return errorMessage;
    })
  }

  logout(): void{
    this.user.next(null);
    localStorage.removeItem('X-token');
    this.router.navigate([''])
  }

}
