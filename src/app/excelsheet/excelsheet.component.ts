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

  getExcelFile(){
    let url = 'http://localhost:8080/api/excel-files/2'
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
  }

  getExcelData(){
    let counter : any;
let url = 'http://localhost:8080/api/excel-files/';
let conUrl = url.concat(this.id);
let finalUrl = conUrl.concat('/rows')
      
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
        let responseLength = Object.keys(Response).length;     
        for (let i = 0; i <= responseLength; i++) {
          counter = { id: Response["rows"][i]["id"], name: Response["rows"][i]["name"], age: Response["rows"][i]["age"], gender: Response["rows"][i]["gender"], mobile: Response["rows"][i]["mobile"],email: Response["rows"][i]["email"]}
          
          this.rowObj.push(counter);
        }
        }
        // this.rowData = this.rowObj;
      });
  }

  onRowSelect(e, id: String) {
    if (e.target.checked) {
      console.log("Radio button triggered")
      console.log("Row id " + id  + " selected");
    }
  }

  deleteRow(rowId : string){
    let counter : any;
let url = 'http://localhost:8080/api/excel-files/';
let conUrl = url.concat(this.id);
let finalUrl = conUrl.concat('/rows/').concat(rowId);
console.log("url " + finalUrl);
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
  for (let i = 0; i <= responseLength; i++) {
    counter = { id: Response["rows"][i]["id"], name: Response["rows"][i]["name"], age: Response["rows"][i]["age"], gender: Response["rows"][i]["gender"], mobile: Response["rows"][i]["mobile"],email: Response["rows"][i]["email"]}
    
    this.rowObj.push(counter);
  }
  }
console.log()
});
  }

  onGridReady(params){
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }
}
