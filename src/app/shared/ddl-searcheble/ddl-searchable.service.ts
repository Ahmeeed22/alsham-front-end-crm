import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import * as global from '../../../config/global';


@Injectable({
  providedIn: 'root'
})
export class DdlSearchableService {

  constructor(private _HttpClient:HttpClient) { }

  getListItems(apiPath:string,filterData:any):Observable<any> {
    return this._HttpClient.post(`${apiPath}`, filterData);
  }
}
