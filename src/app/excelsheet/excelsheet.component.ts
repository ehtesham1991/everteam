import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-excelsheet',
  templateUrl: './excelsheet.component.html',
  styleUrls: ['./excelsheet.component.css']
})
export class ExcelsheetComponent implements OnInit {
  id:any;
  rowObj:any =[];
  token : string;
  role : string;
  headerToken : string;
  gridApi : any;
  columnApi : any;
  rowSelection;
  name : '';
  age: '';
  gender : '';
  mobile:'';
  email:'';
  editedRowId:'';

  columnDefs =[
    { headerName: "Name", field: "name" , sortable : true , filter :true, editable : true},
    { headerName: "Age", field: "age", sortable : true, filter :true,editable : true},
    { headerName: "Gender", field: "gender", sortable : true, filter :true,editable : true},
    { headerName: "Mobile", field: "mobile", sortable : true, filter :true,editable : true},
    { headerName: "Email", field: "email", sortable : true, filter :true,editable : true}
  ];

  rowData : any;; 


  constructor(private http: HttpClient) {
    
    this.id = sessionStorage.getItem('fileId');
    console.log("ID is == >  " + this.id);
    this.rowSelection = 'multiple';
   }

  ngOnInit(): void {
    this.token = sessionStorage.getItem("token");
    this.role = sessionStorage.getItem("roles");
    this.headerToken = ("Bearer ").concat(this.token);
    // this.getExcelFile();
    this.getExcelData();
  }

  /*getExcelFile(){
    let url = 'http://localhost:8080/api/excel-files/'.concat(this.id)
    //  this.http.get<any>(url, {headers:headers, responseType: 'blob'});
    this.http.get(url,{
      headers: {
       'Authorization': this.headerToken,
        observe: 'response',
        Accept : 'application/octet-stream'
      },
      responseType: 'blob',observe: 'response'
     }).subscribe(Response => {
        console.log("-----------------------------");
        const fileName = Response.headers.get('File-Name');
        const file = Response.body;
        // saveAs(Response.body, fileName)
        // console.log(Response)
      });
  }*/

  getExcelData(){
    let counter : any;
let url = 'http://localhost:8080/api/excel-files/';
let conUrl = url.concat(this.id);
let finalUrl = conUrl.concat('/rows')

console.log('get excel-row-url', finalUrl);
      
      this.http.get(finalUrl, {
        headers: {
          'page': '1',
          'size': '30',          
          'Authorization': this.headerToken
        }
      }).subscribe(Response => {
        console.log("============== Row Response ==========")
        // console.log(Response);
        if(Response!=null && Response!= undefined){
          // this.rowObj = Response["rows"];
          ;
        let responseLength = Object.keys(Response).length;     
        for (let i = 0; i <= Response["rows"].length; i++) {
          counter = { id: Response["rows"][i]["id"], name: Response["rows"][i]["name"], age: Response["rows"][i]["age"], gender: Response["rows"][i]["gender"], mobile: Response["rows"][i]["mobile"],email: Response["rows"][i]["email"]}
          
          this.rowObj.push(counter);
        }
        }
        // this.rowData = this.rowObj;
      });
  }


  deleteRow(rowId : string){
    let counter : any;
let url = 'http://localhost:8080/api/excel-files/';
let conUrl = url.concat(this.id);
let finalUrl = conUrl.concat('/rows/').concat(rowId);
console.log("delete-row-url " + finalUrl);
this.http.delete(finalUrl, {
  headers: {
    'page': '1',
    'size': '30',          
    'Authorization': this.headerToken
  }
}).subscribe(Response => {
  console.log("==============DELETE Row Response ==========")
  // console.log(Response);
  if(Response!=null && Response!= undefined){
    // this.rowObj = Response["rows"];
  let responseLength = Object.keys(Response).length;  
  this.rowObj = [];   
  // for (let i = 0; i <= responseLength; i++) {
  //   counter = { id: Response["rows"][i]["id"], name: Response["rows"][i]["name"], age: Response["rows"][i]["age"], gender: Response["rows"][i]["gender"], mobile: Response["rows"][i]["mobile"],email: Response["rows"][i]["email"]}
    
    this.rowObj = Response["rows"];
  
  }
// console.log()
});
  }

  onAddRow(){
    let counter : any;
let url = 'http://localhost:8080/api/excel-files/';
let conUrl = url.concat(this.id);
let finalUrl = conUrl.concat('/rows');
console.log('addrow-url', finalUrl);

let data = {
  "name": this.name,
  "email": this.email,
  "mobile": this.mobile,
  "age": this.age,
  "gender": this.gender
};
this.http.post(finalUrl,data, {
  headers: {
    'page': '1',
    'size': '30',          
    'Authorization': this.headerToken
  }
})
  .subscribe(responsedata => {
    this.rowObj = [];
      this.rowObj=responsedata["rows"];
  },
    err => {
    }
  );
    
  }

  getDetailForId(rowId : string){
    for(let i = 0; i <= this.rowObj.length; i++){
      if(rowId == this.rowObj[i].id){
        console.log("data Found");
        this.name = this.rowObj[i].name;
        this.age = this.rowObj[i].age;
        this.gender = this.rowObj[i].gender;
        this.mobile = this.rowObj[i].mobile;
        this.email = this.rowObj[i].email;
        this.editedRowId = this.rowObj[i].id;
      }
    }
   
    
  }

  updateRow(){
 
    let url = 'http://localhost:8080/api/excel-files/';
    let conUrl = url.concat(this.id);
    let finalUrl = conUrl.concat('/rows/').concat(this.editedRowId);
    console.log('update-row-url', finalUrl);
    let data = {
      "name": this.name,
      "email": this.email,
      "mobile": this.mobile,
      "age": this.age,
      "gender": this.gender
    };
    this.http.put(finalUrl,data, {
      headers: {
        'page': '1',
        'size': '30',          
        'Authorization': this.headerToken
      }
    }).subscribe(responsedata => {
        this.rowObj = [];
          this.rowObj=responsedata["rows"];
      },
        err => {
        }
      );
  }

  saveIntoDatabase(){
    
    let counter : any;
let url = 'http://localhost:8080/api/excel-files/';
let conUrl = url.concat(this.id);
let finalUrl = conUrl.concat('/save');
console.log('save-url', finalUrl);

this.http.post(finalUrl,null, {
  headers: {         
    'Authorization': this.headerToken
  }
})
  .subscribe(responsedata => {
  },
    err => {
    }
  );
    
  }
}
