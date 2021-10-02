import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalConstantsService {

  public static apiExcelEndPoint: string = 'http://localhost:8080/api/excel-files/';
  public static apiLoginEndPoint: string = 'http://localhost:8080/auth/user/login';
  public static apiRegisterEndPoint: string = 'http://localhost:8080/auth/user/register';
  constructor() { }
}
