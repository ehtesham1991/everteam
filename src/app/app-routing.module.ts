import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ExcelsheetComponent } from './excelsheet/excelsheet.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent},
  {path:'excelsheet',component:ExcelsheetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
