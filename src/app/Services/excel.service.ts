import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalConstantsService } from '../common/global-constants.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  baseUrl=GlobalConstantsService.apiExcelEndPoint;

  constructor(private http: HttpClient, private _router: Router) { }

  getData(id, pageNumber, pageSize, header) {

    let url = this.baseUrl;
    let conUrl = url.concat(id);
    let finalUrl = conUrl.concat('/rows')

    console.log('get excel-row-url', finalUrl);

    return this.http.get(finalUrl, {
      headers: {
        'page': pageNumber.toString(),
        'size': pageSize.toString(),
        'Authorization': header,
      },
      observe: 'response'
    })
  }

  delete(id, rowId, pageNumber, pageSize, header) {
    let url = this.baseUrl;
    let conUrl = url.concat(id);
    let finalUrl = conUrl.concat('/rows/').concat(rowId);
    console.log("delete-row-url " + finalUrl);
    return this.http.delete(finalUrl, {
      headers: {
        'page': pageNumber.toString(),
        'size': pageSize.toString(),
        'Authorization': header
      },
      observe: 'response'
    })
  }

  add(id, name, email, mobile, age, gender, pageNumber, pageSize, token) {
    let url = this.baseUrl;
    let conUrl = url.concat(id);
    let finalUrl = conUrl.concat('/rows');
    console.log('addrow-url', finalUrl);

    let data = {
      "name": name,
      "email": email,
      "mobile": mobile,
      "age": age,
      "gender": gender
    };
    return this.http.post(finalUrl, data, {
      headers: {
        'page': pageNumber.toString(),
        'size': pageSize.toString(),
        'Authorization': token
      },
      observe: 'response'
    })
  }

  update(id, editId, name, email, mobile, age, gender, pageNumber, pageSize, token) {

    let url = this.baseUrl;
    let conUrl = url.concat(id);
    let finalUrl = conUrl.concat('/rows/').concat(editId);
    console.log('update-row-url', finalUrl);
    let data = {
      "name": name,
      "email": email,
      "mobile": mobile,
      "age": age,
      "gender": gender
    };
    return this.http.put(finalUrl, data, {
      headers: {
        'page': pageNumber.toString(),
        'size': pageSize.toString(),
        'Authorization': token
      }
    })
  }

  save(id, headerToken) {

    let counter: any;
    let url = this.baseUrl;
    let conUrl = url.concat(id);
    let finalUrl = conUrl.concat('/save');
    console.log('save-url', finalUrl);

    return this.http.post(finalUrl, null, {
      headers: {
        'Authorization': headerToken
      }
    })
  }
}
