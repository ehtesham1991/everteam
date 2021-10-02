import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExcelService } from '../Services/excel.service';
import { HomeService } from '../Services/home.service';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-excelsheet',
  templateUrl: './excelsheet.component.html',
  styleUrls: ['./excelsheet.component.css']
})
export class ExcelsheetComponent implements OnInit {
  id: any;
  rowObj: any = [];
  token: string;
  role: string;
  headerToken: string;
  name: '';
  age: '';
  gender: '';
  mobile: '';
  email: '';
  editedRowId: '';
  pageNumber: number = 1;
  pageSize: number = 2;
  totalPage: string;

  rowData: any;;


  constructor(private http: HttpClient, private _router: Router, private _excelService: ExcelService, private _homeService: HomeService) {

    this.id = sessionStorage.getItem('fileId');
    console.log("ID is == >  " + this.id);
  }

  ngOnInit(): void {
    this.token = sessionStorage.getItem("token");
    this.role = sessionStorage.getItem("roles");
    this.headerToken = ("Bearer ").concat(this.token);
    this.pageNumber = 1;
    this.getExcelData();
    this._homeService.userType(this.role);
  }


  getExcelData() {
    let counter: any;
    this._excelService.getData(this.id, this.pageNumber, this.pageSize, this.headerToken).subscribe(Response => {
      console.log("============== Row Response ==========")
      this.totalPage = Response.headers.get('X-Total-Pages');
      console.log('total-page', this.totalPage);
      if (Response.body != null && Response.body != undefined) {
        this.rowObj = [];
        for (let i = 0; i <= Response.body["rows"].length; i++) {
          counter = { id: Response.body["rows"][i]["id"], name: Response.body["rows"][i]["name"], age: Response.body["rows"][i]["age"], gender: Response.body["rows"][i]["gender"], mobile: Response.body["rows"][i]["mobile"], email: Response.body["rows"][i]["email"] }
          this.rowObj.push(counter);
        }
      }
    });
  }


  deleteRow(rowId: string) {
    this._excelService.delete(this.id, rowId, this.pageNumber, this.pageSize, this.headerToken).subscribe(Response => {
      console.log("==============DELETE Row Response ==========")
      this.totalPage = Response.headers.get('X-Total-Pages');
      if (Response != null && Response != undefined) {
        this.rowObj = [];
        this.rowObj = Response["rows"];
        this.getExcelData();
      }
    });
  }

  onAddRow() {
    this._excelService.add(this.id, this.name, this.email, this.mobile, this.age, this.gender, this.pageNumber, this.pageSize, this.headerToken).subscribe(responsedata => {
            this.totalPage = responsedata.headers.get('X-Total-Pages');
      this.rowObj = [];
      this.rowObj = responsedata["rows"];
      this.getExcelData();
    },
      err => {
      }
    );

  }

  getDetailForId(rowId: string) {
    for (let i = 0; i <= this.rowObj.length; i++) {
      if (rowId == this.rowObj[i].id) {
        this.name = this.rowObj[i].name;
        this.age = this.rowObj[i].age;
        this.gender = this.rowObj[i].gender;
        this.mobile = this.rowObj[i].mobile;
        this.email = this.rowObj[i].email;
        this.editedRowId = this.rowObj[i].id;
      }
    }


  }

  updateRow() {

    this._excelService.update(this.id, this.editedRowId, this.name, this.email, this.mobile, this.age, this.gender, this.pageNumber, this.pageSize, this.headerToken).subscribe(responsedata => {
      this.rowObj = [];
      this.rowObj = responsedata["rows"];
    },
      err => {
      }
    );
  }

  saveIntoDatabase() {
    this._excelService.save(this.id, this.headerToken).subscribe(responsedata => {
      this._router.navigateByUrl('home');
    },
      err => {
      }
    );

  }

  firstPage() {
    if (this.pageNumber != 1) {
      this.pageNumber = 1;
      this.getExcelData();
    }
  }

  nextPage() {
    if (parseInt(this.totalPage) > this.pageNumber) {
      this.pageNumber = this.pageNumber + 1;
      this.getExcelData();
    }
  }

  previosPage() {
    if (this.pageNumber > 1) {
      this.pageNumber = this.pageNumber - 1;
      this.getExcelData();
    }
  }

  lastPage() {
    if (this.pageNumber != parseInt(this.totalPage)) {
      this.pageNumber = parseInt(this.totalPage);
      this.getExcelData();
    }
  }
}
