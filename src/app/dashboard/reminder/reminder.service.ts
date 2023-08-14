import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private http:HttpClient) { }
  public IsReminder=new BehaviorSubject<boolean>(false) ;
  public IsReminderUrgent=new BehaviorSubject<boolean>(false) ;
  getAllReminders(filter:any):Observable<any>{

    return this.http.post(`${environment.baseApi}allReminders`,filter)
  }

  deleteReminder(id:any):Observable<any>{
    return this.http.delete(`${environment.baseApi}deleteReminder/${id}`)
  }

  addReminder(data:any):Observable<any>{
    return this.http.post(`${environment.baseApi}addReminder`,data)
  }

  updateRemider(id:any,data:any):Observable<any>{
    return this.http.put(`${environment.baseApi}updateReminder/${id}`,data)
  }

}
