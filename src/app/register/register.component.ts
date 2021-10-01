import { Component, OnInit,NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name : '';
  password: '';
  role : any [];

  constructor(private http: HttpClient,private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    console.log("name : " + this.name);
    console.log("password : " + this.password);
    console.log("role : " + this.role);
    let params = {
      "username": this.name,
      "password": this.password,
      "roles": [this.role]
    };
    let registrationUrl = 'http://localhost:8080/auth/user/register';
    this.http.post(registrationUrl, params)
      .subscribe(responsedata => {
    this.login();
    alert('Registration Successfull');
      },
        err => {
        }
      );
  }
  login(){
    this._router.navigateByUrl('');
  }
}
