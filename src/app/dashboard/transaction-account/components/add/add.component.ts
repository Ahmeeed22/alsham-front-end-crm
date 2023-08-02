import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/dashboard/service/services.service';
import { ComfirmationComponent } from 'src/app/shared/comfirmation/comfirmation.component';
import { DdlSearchableComponent } from 'src/app/shared/ddl-searcheble/ddl-searchable/ddl-searchable.component';
import { Item } from 'src/app/shared/ddl-searcheble/models/item';
import { TransactionAccountService } from '../../services/transaction-account.service';
import { TransactionsService } from 'src/app/dashboard/transactions/transactions.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @ViewChild('banks') banks !: DdlSearchableComponent;
  banksObj!:Item;
  newServiceForm :any;
  formValues:any ;
  minDate:any;
  @ViewChild('type') type !: DdlSearchableComponent;
  statusObj : Item= { staticArray:[{id:'supply',name:' Supply'},{id:'expenses',name:'Expenses'}], placeholder: 'الحالة ', placeholderEn: 'Type', required: true, searachable: false, multiSelect: false} ;
  typeSupplyed :boolean=false ;
  constructor(
    private fb:FormBuilder ,
    private _Router:Router,
    private toaster:ToastrService,
    private _TransactionAccountService:TransactionAccountService,
    private _TransactionsService:TransactionsService,
    public dialog: MatDialogRef<AddComponent> , 
    public dialogpublic: MatDialog ,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _ServicesService:ServicesService
  ) { 
    this.createForm();
    this.getAllBanksAccounts()
  }

  ngOnInit(): void {
  }

  createForm() {
    this.minDate=this.data?.dateExpire||new Date(1/1/2015)
    this.newServiceForm = this.fb.group({
      receiptNumber : [this.data?.receiptNumber || '' , Validators.required],
      amount : [this.data?.amount || 0 , Validators.required],
      // dateExpire : [this.data?.dateExpire || null,Validators.min(0) ],
    })

    this.formValues = {...this.newServiceForm.value}
  }

  createTransactionAccount(){
    var accountId=this.banks?.gettingResult()?.id || null ;
    let finalData={...this.newServiceForm.value,type:this.type.gettingResult()?.id , accountId}
    
    console.log(finalData);
    if (this.newServiceForm.valid && this.type.validate()) {
      console.log(this.newServiceForm);
      console.log(this.type.validate());
      this._TransactionAccountService.addTransactionAccount(finalData).subscribe({
        next:(res)=>{
          console.log(res);
          this.toaster.success("success add transaction Account","success")
          this.dialog.close(true)
        },
        error:err=>{
          this.newServiceForm.markAllAsTouched() ;
        }
      })
    }else{
      this.newServiceForm.markAllAsTouched() ;
      this.type.validate() ;
      console.log(this.newServiceForm);
      console.log(this.type.validate());
      
      
    }
    
  }

  testChange(){
    let hasChanges = false
    Object.keys(this.formValues).forEach((item) => { 
      if(this.formValues[item] !== this.newServiceForm.value[item])   {
        hasChanges= true ;
      }
    })

    return hasChanges
  }

  close(){
    let confiremPopup
    if (this.testChange()) {
       confiremPopup=this.dialogpublic.open(ComfirmationComponent,{
        width: '750px',
        disableClose:true,
      })
      confiremPopup?.afterClosed().subscribe(result=>{
        if(result!=='no') {
          this.dialog.close()
        }
      })
    }else{
      this.dialog.close()
    }
  }

  getAllBanksAccounts(){
    this._TransactionsService.getAllBankAccount().subscribe({
      next:(res)=>{
        console.log(res);
        this.banksObj= { staticArray:res.result.rows, placeholder: 'البنك', placeholderEn: 'Bank Account', required: false, searachable: true, multiSelect: false, oldSelectedItems:this?.data?.service
      };
        
      },
      error :(err)=>{
        console.log(err);
        
      }
  })
}

}
