import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http:HttpClient) { }
  
  getAllCustomers():Observable<any>{
    return this.http.get(`${environment.baseApi}allcustomers`)
  }

  getAllCustomersSearch():Observable<any>{
    return this.http.get(`${environment.baseApi}searchCustomer`)
  }

}
