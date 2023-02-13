import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {

  constructor(private _Router :Router){
  }


  canActivate(): Observable<boolean> | boolean  {
    const token=localStorage.getItem('token')
    if (token) {
      // route to home 
      this._Router.navigateByUrl("/main")
      return false
    } else {
      return true;
    }
  }
  
}
