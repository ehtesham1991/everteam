import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalConstantsService } from '../common/global-constants.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl=GlobalConstantsService.apiExcelEndPoint;
  constructor(private http: HttpClient, private _router: Router) { }

  uploadFile(header, data) {
    return this.http
      .post<any>(this.baseUrl, data, {
        headers: {
          'Authorization': header
        }
      })
  }

  getExcelList(token) {
    let excelFileUrl = this.baseUrl;
    return this.http.get(excelFileUrl, { headers: { 'Authorization': token } })
  }

  openFile(id) {
    console.log("ITEM Selected ==== > " + id);
    sessionStorage.setItem('fileId', id.toString());
    this._router.navigateByUrl('excelsheet');
  }

  userType(role) {
    if (role == 'ROLE_READ') {
      return alert("You are logged in as a 'READ' user !");
    }
    else if (role == 'ROLE_MIGRATE') {
      return alert("You are logged in as a 'MIGRATE' user !")
    }
  }
}
