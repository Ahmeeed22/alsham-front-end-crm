import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SppliersService } from '../../sppliers.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TransactionsService } from 'src/app/dashboard/transactions/transactions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-supplier-transaction',
  templateUrl: './add-supplier-transaction.component.html',
  styleUrls: ['./add-supplier-transaction.component.scss']
})
export class AddSupplierTransactionComponent implements OnInit {
  suppliers:any[]=[];
  banks:any[]=[] ;
  formAdd=new FormGroup({
    amount : new FormControl(0,[Validators.required,Validators.min(10)]) ,
    supplierId : new FormControl(null,[Validators.required]),
    bankId : new FormControl(null),
    desc : new FormControl(null,[Validators.required]),
    type : new FormControl('credit',[Validators.required])
  }) ;
  constructor(private _SppliersService:SppliersService, private _TransactionsService:TransactionsService ,public dialog: MatDialogRef<AddSupplierTransactionComponent> , private toaster:ToastrService,) { 
    this.getAllSuppliers() ;
    this.getAllBanksAccounts() ;
  }

  ngOnInit(): void {
  } ;

  getAllSuppliers(){
    this._SppliersService.getAllSuppliers().subscribe({
      next:(res)=>{
        this.suppliers=res.result.rows ;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  } ;

  getAllBanksAccounts(){
    this._TransactionsService.getAllBankAccount().subscribe({
      next:(res)=>{
        console.log(res);
        this.banks=res.result.rows ;
        this.toaster.success("get all banks accounts" ,"success")
      },
      error :(err)=>{
        this.toaster.error("error getting banks" , "error")
      }
  })
}

  save(){
    this.formAdd?.markAllAsTouched() ;
    if (this.formAdd?.valid) {
      this._SppliersService.addsupplierStatementAccount(this.formAdd?.value).subscribe({
        next :(res)=>{
          this.toaster.success("success add statement","success")
          this.dialog.close(true)
        },
        error :(err)=>{
          console.log(err);
          this.toaster.error("error saving data" , "error")
        }
      })
    }else{
      this.toaster.error("please enter valid data","data")
    }
    console.log(this.formAdd.value);
  }

  

}
