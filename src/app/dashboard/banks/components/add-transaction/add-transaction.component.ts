import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TransactionsService } from 'src/app/dashboard/transactions/transactions.service';
import { ToastrService } from 'ngx-toastr';
import { BanksService } from '../../banks.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {

  formAdd =new FormGroup({
    accountId: new FormControl('',[Validators.required]) ,
    amount : new FormControl('',[Validators.required]) ,
    DESC : new FormControl('') ,
    type : new FormControl('',[Validators.required])
  }) ;
  banks : any[]=[] ;


  constructor(private _BanksService:BanksService,public dialog: MatDialogRef<AddTransactionComponent> , private toaster:ToastrService ) {
    this.getAllBanks() ; 

   }

  ngOnInit(): void {
  }

  getAllBanks(){
    this._BanksService.getAllBanks().subscribe({
      next : (res)=>{
        this.banks=res.result.rows ;
        this.toaster.success("get banks success","banks success")
      },
      error : (err)=>{
        this.toaster.error(err,"banks error")
      }
    })
  }

  save(){
    this.formAdd?.markAllAsTouched() ;
    if (this.formAdd?.valid) {
      this._BanksService.addBankStatementAccount(this.formAdd.value).subscribe({
        next : (res)=>{
          this.toaster.success("bank statement added success and update bank balance success","Success") ;
          this.dialog.close()
        },
        error : (error)=>{
          this.toaster.error(error,"failed add")
        }
      })
    }else{
      this.toaster.warning("please enter valid data","Required Data")
    }
  }


}
