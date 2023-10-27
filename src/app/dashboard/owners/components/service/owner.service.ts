import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http:HttpClient) { }

  getAllOwners(filterObj:any={}):Observable<any>{
    return this.http.post(`${environment.baseApi}getAllOwners`,filterObj)
  }

  createOwner(data:any):Observable<any>{
    return this.http.post(`${environment.baseApi}addOwners`,data)
  }

  getCapitalAndOwnerDrawing():Observable<any>{
    return this.http.get(`${environment.baseApi}getCapitalAndOwnerDrawing`)
  }
}
