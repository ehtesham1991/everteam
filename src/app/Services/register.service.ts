import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalConstantsService } from '../common/global-constants.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl=GlobalConstantsService.apiRegisterEndPoint;

  constructor(private http: HttpClient, private _router: Router) { }

  register(username, password, userRole) {
    let registerParams = {
      "username": username,
      "password": password,
      "roles": [userRole]
    };
    let registrationUrl = this.baseUrl;
    return this.http.post(registrationUrl, registerParams)
  }

  login() {
    this._router.navigateByUrl('');
  }
}
