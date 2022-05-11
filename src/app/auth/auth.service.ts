import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    this.http.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=\n" +
      "AIzaSyCfgBbiH9i6-3Lg22h47RNhyWZegGlyZjk",{
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(tap(responseData => console.log(responseData)))
  }
}
