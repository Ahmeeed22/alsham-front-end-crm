import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BanksService {

  constructor(private _HttpClient:HttpClient) { }

  getAllBanks():Observable<any>{
    return this._HttpClient.get(`${environment.baseApi}getAllBankAccount`) ;
  }

  getAllBanksStatements():Observable<any>{
    return this._HttpClient.get(`${environment.baseApi}allbankingTransactionHistory`) ;
  }

  addBankStatementAccount(data:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseApi}addbankingTransactionHistory`,data)
  }
}
