import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   baseURL=environment.baseApi  ;
  constructor(private _HttpClient:HttpClient ,  private router:Router) { }

  login(model:any):Observable<any>{
    return this._HttpClient.post(`${this.baseURL}login`,model)
  }

  
  
}
