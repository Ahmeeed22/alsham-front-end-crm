import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ReminderService } from '../reminder/reminder.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent{
  sideBarOpen:boolean=true ;
  isLogged:boolean =false;
  user:any;
  isReminder:boolean=false ;
  constructor(private authService:AuthService , private router:Router, private toaster:ToastrService,private _ReminderService: ReminderService) { 
   this.authService.currentUser.subscribe(res=> {
      this.isLogged = this.authService.currentUser.getValue()!==null ? true : false ;
      this.user=this.authService.currentUser.getValue()
      console.log(this.user);
      
    }) 
   this._ReminderService.IsReminder.subscribe(()=>{
    this.isReminder=this._ReminderService.IsReminder.getValue() ;
    console.log(this.isReminder);
   }) 
    setInterval(()=>{
      this.hiA()
    },6000)
  }

  toggleSidebar(){
    this.sideBarOpen= !this.sideBarOpen
  }

  logOut(){
    
    localStorage.removeItem('token')
    this.authService.currentUser.next(null)
    this.router.navigate(['/login'])
    this.toaster.success("logout Succesfully" , "Success")
   }
   hiA(){
    var pathA:any=document.getElementById("ramd");
     pathA?.classList?.toggle("hiA");
     setTimeout(function(){  pathA?.classList?.toggle("hiA"); }, 3000);
    }
}
