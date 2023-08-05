import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SppliersService {

  constructor(private _HttpClient:HttpClient) { }

  getAllSuppliers():Observable<any>{
    return this._HttpClient.get(`${environment.baseApi}allsupplier`) ;
  }

  getAllSuppliersStatements():Observable<any>{
    return this._HttpClient.get(`${environment.baseApi}allsupplierStatementAccount`) ;
  }

  addsupplierStatementAccount(data:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseApi}addsupplierStatementAccount`,data)
  }

}
