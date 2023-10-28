import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  baseURL=environment.baseApi  ;
  constructor(private http:HttpClient) { }

  getAllTransactions(filter:any):Observable<any>{
    return this.http.post(`${this.baseURL}allTransactions`,filter)
  }

  addTransaction(data:any):Observable<any>{
    return this.http.post(`${this.baseURL}addTransaction`,data)
  }

  deleteTransaction(id:number):Observable<any>{
    return this.http.patch(`${this.baseURL}deleteTransactionSoft/${id}`,{})
  }
  updateTransaction(id:number ,data:any):Observable<any>{
    return this.http.put(`${this.baseURL}updateTransaction/${id}`,data)
  }
  getSummary(filter:any):Observable<any>{
    return this.http.post(`${environment.baseApi}getTransactionsSummary`,filter)
  }

  getAllBankAccount():Observable<any>{
    return this.http.get(`${environment.baseApi}getAllBankAccount`)
   }

   
   getAllsuppliers():Observable<any>{
    return this.http.get(`${environment.baseApi}allsupplier`)
   }
   

   addDipostHistory(data:any):Observable<any> {
    return this.http.post(`${environment.baseApi}addDepositHistory`,data)
   }

   getExpensesSum():Observable<any>{
    return this.http.get(`${environment.baseApi}getExpensesSum`)
   }

}
