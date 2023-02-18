import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  sideBarOpen:boolean=true ;
  isLogged:boolean =false;
  constructor(private authService:AuthService , private router:Router, private toaster:ToastrService) { 
   this.authService.currentUser.subscribe(res=> {
      this.isLogged = this.authService.currentUser.getValue()!==null ? true : false ;
      console.log(this.authService.currentUser.getValue());
      
    }) 
  }

  ngOnInit(): void {
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
}
