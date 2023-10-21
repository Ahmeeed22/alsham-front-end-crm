import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ReminderService } from '../reminder/reminder.service';
import * as moment from 'moment';

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
  isReminderUrgent:boolean=false ;
  isAccountantSubMenuOpen: boolean = false;

  constructor(private authService:AuthService , private router:Router, private toaster:ToastrService,private _ReminderService: ReminderService) { 
   this.authService.currentUser.subscribe(res=> {
      this.isLogged = this.authService.currentUser.getValue()!==null ? true : false ;
      this.user=this.authService.currentUser.getValue()
      console.log(this.user);
      
    }) 
    setInterval(()=>{
      this.hiA()
    },6000)
    this.getAllReminders()
    this._ReminderService.IsReminder.subscribe(()=>{
    })

    this._ReminderService.IsReminder.subscribe(()=>{
     this.isReminder=this._ReminderService.IsReminder.getValue() ;
     this.isReminderUrgent=this._ReminderService.IsReminderUrgent.getValue() ;
    }) 
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

    getAllReminders(filter?: any) {

      this._ReminderService.getAllReminders(filter).subscribe({
        next: (res) => {
          // Calculate the date 4 days ago
          const fourDaysAgo = new Date();
          fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);

          const urgentRemider=res.result.rows.filter((item:any)=>{
            // console.log("item.dateExpire",item.dateExpire,"fourDaysAgo",fourDaysAgo);
            // console.log(typeof moment(item.dateExpire).toDate() );
            
            
            return moment(item.dateExpire).toDate() < fourDaysAgo
          })
          console.log(urgentRemider);
          
          urgentRemider.length>0 ? this._ReminderService.IsReminderUrgent.next(true) : this._ReminderService.IsReminderUrgent.next(false)
          console.log(this._ReminderService.IsReminderUrgent.getValue());
          
          if (!filter&&res.result.rows.length>0) {
            this._ReminderService.IsReminder.next(true)
          } 
          if(!filter&&res.result.rows.length==0){
            this._ReminderService.IsReminder.next(false)
          }

         
        }
      })
      
    }
    toggleAccountantSubMenu() {
      console.log("test");
      
      this.isAccountantSubMenuOpen = !this.isAccountantSubMenuOpen;
    }
    
}
