import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: '';
  password: '';
  token: '';
  role: '';

  constructor(private http: HttpClient, private _router: Router, private _loginService: LoginService) { }

  ngOnInit(): void {
  }

  navigateToHome() {
    this._loginService.home();
  }


  login() {
    this._loginService.login(this.username, this.password).subscribe(responsedata => {
      if (responsedata["status"] == 202) {
        this.token = responsedata["data"]["token"];
        this.role = responsedata["data"]["roles"];
        sessionStorage.setItem("token", this.token);
        sessionStorage.setItem("roles", this.role);
        this._router.navigateByUrl('home');
      }
    },
      err => {
        alert("Invalid Credentials");
      }
    );
  }

  register() {
    this._loginService.register();
  }

}
