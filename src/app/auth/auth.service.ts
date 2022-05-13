import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap, throwError} from "rxjs";
import {User} from "./user.model";

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

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<UserResposneData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfgBbiH9i6-3Lg22h47RNhyWZegGlyZjk",{
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(tap(resData => {
      this.user.next(new User(resData.localId, resData.email,resData.idToken,new Date(new Date().getTime() + Number(resData.expiresIn) * 1000)))
    }),catchError(this.handleError))
  }

  private handleError(error: any) {
    return throwError(() => {
      let errorMessage: string = "Unknown error has occurred";
      if(error.error.error.message == "EMAIL_NOT_FOUND" || error.error.error.message == "INVALID_PASSWORD" ) {
        errorMessage = "Invalid email or password";
      }
      console.log(error.error.error.message)
      return errorMessage;
    })
  }

}
