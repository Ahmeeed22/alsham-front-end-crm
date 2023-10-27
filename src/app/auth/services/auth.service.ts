import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap ,Observable} from 'rxjs';

import { environment } from 'src/environments/environment';
import { Login } from '../context/DTOs';
import jwtDecode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   baseURL=environment.baseApi  ;
   currentUser =new BehaviorSubject(null) ;
   
   constructor(private _HttpClient:HttpClient ,  private router:Router) { 
     if (localStorage.getItem('token')) {
      const token :any=localStorage.getItem('token')
      this.currentUser.next(jwtDecode(token))  ;
     }
     
  }

  login(model:any):Observable<any>{
    return this._HttpClient.post(`${this.baseURL}login`,model)
  }

  saveUserCurrent(){
    const token :any=localStorage.getItem('token')
    this.currentUser.next(jwtDecode(token))  ;
  }

  getAllUser():Observable<any>{
    return this._HttpClient.get(`${environment.baseApi}allUsers`)
  }

  getSumDeposit():Observable<any>{
    return this._HttpClient.get(`${environment.baseApi}getSumDeposit`)
  }

  getSumBalance():Observable<any>{
    return this._HttpClient.get(`${environment.baseApi}getAllSumBalanceCustomers`)
  }

}
