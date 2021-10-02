import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterService } from '../Services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: '';
  password: '';
  role: any[];

  constructor(private http: HttpClient, private _router: Router, private _registerService: RegisterService) { }

  ngOnInit(): void {
  }

  registerUser() {
    this._registerService.register(this.name, this.password, this.role)
      .subscribe(responsedata => {
        this.login();
        alert('Registration Successfull');
      },
        err => {
        }
      );
  }

  login() {
    this._registerService.login();
  }
}
