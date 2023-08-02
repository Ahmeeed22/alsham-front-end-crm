import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionAccountService {

  constructor(private _httpClient:HttpClient) {
   }

   getAllTransactionAccount(filter:any):Observable<any>{
    return this._httpClient.post(`${environment.baseApi}getAllTransactionAccount`,filter)
   }

   addTransactionAccount(data:any):Observable<any>{
    return this._httpClient.post(`${environment.baseApi}addTransactionAccount`,data)
   }

   deleteTransactionAccount(id:any):Observable<any>{
    return this._httpClient.delete(`${environment.baseApi}deleteTransactionAccount/${id}`)
   }

   updateTransactionAccount(id:any,data:any):Observable<any>{
    return this._httpClient.put(`${environment.baseApi}updateTransactionAccount/${id}`,data)
   }

   

}
