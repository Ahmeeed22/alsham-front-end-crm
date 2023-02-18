import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup = this._formBuilder.group({
    email: ['',[ Validators.required , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', Validators.required ]
  });
  hide = true;
  constructor(
     private _formBuilder: FormBuilder,
     private _AuthService:AuthService , 
     private _Router:Router ,
     private toaster:ToastrService
     ) {

   }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.loginFormGroup.valid){
      this._AuthService.login(this.loginFormGroup.value).subscribe({
        next :(res)=>{
          localStorage.setItem('token',res.token)
          this._AuthService.saveUserCurrent()
          this._Router.navigate(['./main'])
          this.toaster.success("Login Succesfully" , "Success")
        },
        error :(error)=>{
          console.log(error);
          
        }
      })
    }else{
      this.loginFormGroup.markAllAsTouched() ;
    }
  
  }
}
