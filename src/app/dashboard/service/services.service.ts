import { HttpClient } from '@angular/common/http';
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
}
