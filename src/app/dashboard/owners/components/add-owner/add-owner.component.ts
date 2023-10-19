import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OwnerService } from '../service/owner.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from 'src/app/dashboard/transactions/transactions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-owner',
  templateUrl: './add-owner.component.html',
  styleUrls: ['./add-owner.component.scss']
})
export class AddOwnerComponent implements OnInit {
  ownerFormGroup:FormGroup =new FormGroup({
    desc :new FormControl('',[Validators.required]) ,
    amount : new FormControl(0,[Validators.required]),
    type : new FormControl('',[Validators.required]) ,
    accountId : new FormControl('')
  })

  banks:any=[]

  constructor(
    public dialog: MatDialogRef<AddOwnerComponent> ,
    private _OwnerService:OwnerService ,
    private _TransactionsService:TransactionsService,
    private toaster:ToastrService
  ) { 
    this.getAllBanksAccounts()
  }

  ngOnInit(): void {

  }
  getAllBanksAccounts(){
    this._TransactionsService.getAllBankAccount().subscribe({
      next:(res)=>{
        console.log(res);
        this.banks=res.result.rows ;
        this.toaster.success("Success Getting Banks Statements","Success")
      },
      error :(err)=>{
        console.log(err);
        this.toaster.error("faild  Getting Banks Statements","Error")
      }
  })
}

  save(data:any){
    if (this.ownerFormGroup.valid) {
      this._OwnerService.createOwner(data).subscribe({
        next :(res)=>{
          console.log(res);
          this.toaster.success("Owner added success ","Created Success") ;
          this.dialog.close(true)
        },
        error :(err)=>{
          console.log(err);
          this.toaster.error(err,"failed add")
        }
      })
    } else {
      this.toaster.warning("please enter valid data","Required Data")
    }
  }



}
