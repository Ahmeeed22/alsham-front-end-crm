import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../service/owner.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddOwnerComponent } from '../add-owner/add-owner.component';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-list-owner',
  templateUrl: './list-owner.component.html',
  styleUrls: ['./list-owner.component.scss']
})
export class ListOwnerComponent implements OnInit {
  dataSource:any=[] ;
  role : Number=0 ;

  constructor(
    private _OwnerService:OwnerService,
    private toaster:ToastrService, 
    private dialog:MatDialog ,
    private authService:AuthService
  ){
    this.authService.currentUser.subscribe(res=> {
      var user:any=this.authService.currentUser.getValue()
      this.role=user.role
      
    }) 
   }

  ngOnInit(): void {
    this.getAllOwners()
  }

  getAllOwners(){
    this._OwnerService.getAllOwners().subscribe({
      next :res=>{
        this.dataSource=res.result.ownersTransactions.rows ;
        console.log(res);
        
        this.toaster.success("Success Getting Owners Statements","Success")
        
      },
      error :(err)=>{
        this.toaster.error("faild  Getting Owners Statements","Error")
      }
    })
  }

  addownerstatement(){
    const dialogRef = this.dialog.open(AddOwnerComponent, {
      width:"60%",
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllOwners();
    });
  }

}
