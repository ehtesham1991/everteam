import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : '';
  password: '';
  token : '';
  role:'';

  constructor(private http: HttpClient, private _router: Router) { }

  ngOnInit(): void {
  }

  navigateToHome(){
    
    this._router.navigateByUrl('home');
  }

  
  login(){
    console.log("name : " + this.username);
    console.log("password : " + this.password);
    let params = {
      "username": this.username,
      "password": this.password
    };
    let loginUrl = 'http://localhost:8080/auth/user/login';
    this.http.post(loginUrl, params)
      .subscribe(responsedata => {
        if(responsedata["status"] == 202){
          this.token = responsedata["data"]["token"];
          this.role = responsedata["data"]["roles"];
          sessionStorage.setItem("token", this.token);
          sessionStorage.setItem("roles", this.role);
    this._router.navigateByUrl('home');
        }
      },
        err => {
        }
      );
  }

  register(){
    
    this._router.navigateByUrl('register');
  }

}
