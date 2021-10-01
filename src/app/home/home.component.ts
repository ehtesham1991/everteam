import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  fileFlag : boolean;  
  excelFlag : boolean;
  fileObj: any = [];
  rowObj:any =[];
  token : string;
  role : string;
  headerToken : string;
  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,private _router: Router) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem("token");
    this.role = sessionStorage.getItem("roles");
    this.headerToken = ("Bearer ").concat(this.token);
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
    this.fileFlag = false;
  }

  onFileSelect(event) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);

      if (!_.includes(af, file.type)) {
        alert('Only EXCEL Docs Allowed!');
      } else {
        this.fileInputLabel = file.name;
        this.fileUploadForm.get('myfile').setValue(file);
      }
    }
  }


  onFormSubmit() {

    if (!this.fileUploadForm.get('myfile').value) {
      alert('Please fill valid details!');
      return false;
    }

    const formData = new FormData();
    formData.append('file', this.fileUploadForm.get('myfile').value);

    this.http
      .post<any>('http://localhost:8080/api/excel-files', formData, {
        headers: {
         'Authorization': this.headerToken
        }
      }).subscribe(response => {
        console.log(response);
        console.log(response.status);
          // Reset the file input
          console.log("--------------");
          this.uploadFileInput.nativeElement.value = "";
          this.fileInputLabel = undefined;
          this.displayListOfExcels();

      }, error => {
        console.log(error);
      });
  }

  displayListOfExcels(){
    let counter : any;
    this.fileFlag = true;
    let excelFileUrl = 'http://localhost:8080/api/excel-files'
    this.http.get(excelFileUrl,{
      headers: {
       'Authorization': this.headerToken
      }}).subscribe(Response => {
      console.log(Response);
      if(Response!=null && Response!= undefined){
        let noOfFiles = Object.keys(Response).length;
        console.log("***************")
        console.log(noOfFiles);        
        for (let i = 0; i <= noOfFiles; i++) {
          counter = { id: Response[i]["id"], name: Response[i]["name"], draft: Response[i]["name"], createdOn: Response[i]["createdOn"], modifiedOn: Response[i]["modifiedOn"]}
          
          this.fileObj.push(counter);
        }
      }
    })
    
  }

  onContinue(e, id: String) {
      this.excelFlag = true;
      console.log("ITEM Selected ==== > " + id);
      sessionStorage.setItem('fileId', id.toString());
      this._router.navigateByUrl('excelsheet');
      // let url = 'http://localhost:8080/api/excel-files/';
      // let finalUrl = url.concat(id.toString());
      
      // this.http.get(finalUrl, {
      //   headers: {
      //     'page': '1',
      //     'size': '1'
      //   }
      // }).subscribe(Response => {
      //   console.log("============== Row Response ==========")
      //   console.log(Response);
      //   if(Response!=null && Response!= undefined){
      //     let noOfRows = Object.keys(Response).length;
      //     console.log("***************")
      //     console.log(noOfRows);
      //     for (let i = 0; i <= noOfRows; i++) {
      //       counter = { id: Response["rows"][i]["id"],name: Response["rows"][i]["name"],age: Response["rows"][i]["age"],gender: Response["rows"][i]["gender"],mobile: Response["rows"][i]["mobile"],email: Response["rows"][i]["email"]}
      //       this.rowObj.push(counter);
      //     }
      //   }

      // });
  }
}
