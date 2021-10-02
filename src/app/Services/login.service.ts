import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalConstantsService } from '../common/global-constants.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl=GlobalConstantsService.apiLoginEndPoint;

  constructor(private http: HttpClient, private _router: Router) { }

  login(username, password) {
    let loginParams = {
      "username": username,
      "password": password
    };

    let loginUrl = this.baseUrl;
    return this.http.post(loginUrl, loginParams);
  }

  register() {
    this._router.navigateByUrl('register');
  }

  home() {
    this._router.navigateByUrl('home');
  }
}
