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
  constructor(private authService:AuthService , private router:Router, private toaster:ToastrService) { }

  ngOnInit(): void {
  }
  toggleSidebar(){
    this.sideBarOpen= !this.sideBarOpen
  }

  logOut(){
    console.log("trst");
    
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
    
    this.toaster.success("logout Succesfully" , "Success")
   }
}
