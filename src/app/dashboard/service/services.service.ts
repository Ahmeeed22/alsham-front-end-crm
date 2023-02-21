import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http :HttpClient) { }

  getAllServices():Observable<any>{
    return this.http.get(`${environment.baseApi}allservices`) ;
  }
  getAllServicesSearch(filter?:any):Observable<any>{
    let params = new HttpParams();
    if (filter?.name||filter?.active==0 || filter?.active==1) {
      Object.entries(filter).forEach(([key,value]:any)=>{
        if (value ) {
          params = params.append(key,value)
        }
        if (key=='active' && value==0 ) {
          params = params.append('active',0)
        }
      })
    }
    return this.http.get(`${environment.baseApi}searchservice`,{params}) ;
  }
  addService(data:any):Observable<any>{
    return this.http.post(`${environment.baseApi}addservice`,data)
  }
  updateService(id:number,data:any):Observable<any>{
    return this.http.put(`${environment.baseApi}updateservice/${id}`,data)
  }
  deleteService(id:number):Observable<any>
  {
    return this.http.delete(`${environment.baseApi}deleteservice/${id}`)
  }

}
