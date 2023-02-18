import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CustomersService } from 'src/app/dashboard/customer/customers.service';
import { ServicesService } from 'src/app/dashboard/service/services.service';
import { ComfirmationComponent } from 'src/app/shared/comfirmation/comfirmation.component';
import { DdlSearchableComponent } from 'src/app/shared/ddl-searcheble/ddl-searchable/ddl-searchable.component';
import { Item } from 'src/app/shared/ddl-searcheble/models/item';
import { TransactionsService } from '../../transactions.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {
  servicesObj!:Item;
  @ViewChild('services') services !: DdlSearchableComponent;

  customersObj!:Item;
  @ViewChild('customers') customers !: DdlSearchableComponent;
  newTransactionForm :any;
  formValues:any ;

  constructor(
    private _CustomersService:CustomersService,
    private _ServicesService:ServicesService,
    private _TransactionsService:TransactionsService,
    private fb:FormBuilder ,
    private _AuthService:AuthService , 
    private _Router:Router,
    private toaster:ToastrService,
    public dialog: MatDialogRef<AddTransactionComponent> , 
    public dialogpublic: MatDialog ,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) {
      this.createForm()
      this.getServices()
      this.getCustomers()
  }

  ngOnInit(): void {
    this.newTransactionForm?.get("paymentAmount").valueChanges.subscribe(()  => {
       this.newTransactionForm.get('balanceDue').patchValue(((this.newTransactionForm.value.price + this.newTransactionForm.value.profite)*(this.newTransactionForm.value.quantity))-this.newTransactionForm?.get("paymentAmount").value)
    })

    this.newTransactionForm?.get("balanceDue").valueChanges.subscribe(()  => {
      setTimeout(() => {
        this.newTransactionForm.get('paymentAmount').patchValue(((this.newTransactionForm.value.price + this.newTransactionForm.value.profite)*(this.newTransactionForm.value.quantity))-this.newTransactionForm?.get("balanceDue").value)
     })
      }, 500);
  }
  

  createForm() {
    this.newTransactionForm = this.fb.group({
      quantity : [this.data?.quantity || '' , Validators.required],
      balanceDue : [this.data?.balanceDue || '' , Validators.required],
      paymentAmount : [this.data?.paymentAmount || '' , Validators.required],
      profite : [this.data?.profite || '' , Validators.required],
      price : [this.data?.price || '' , Validators.required],
    })

    this.formValues = {...this.newTransactionForm.value}
  }

  getServices(){
    this._ServicesService.getAllServices().subscribe({
      next :(res)=>{
       this.servicesObj= { staticArray:res.result.rows, placeholder: 'الخدمة', placeholderEn: 'Service', required: true, searachable: true, multiSelect: false, oldSelectedItems:this?.data?.service
      };
      }
    })
  }

  getCustomers(){
    this._CustomersService.getAllCustomers().subscribe({
      next :(res)=>{
        console.log(res);
        this.customersObj= { staticArray:res.result.rows, placeholder: 'العميل', placeholderEn: 'Customer', required: true, searachable: true, multiSelect: false,oldSelectedItems:this.data?.customer };
      }
    })
  }

  gatheringData(){
    let customer_id=this.customers.gettingResult()?.id
    let service_id=this.services.gettingResult()?.id
    let userLogged= this._AuthService.currentUser.getValue()
    if (userLogged) {
      const {company_id , id:admin_id}=userLogged ;
      return {...this.newTransactionForm.value ,customer_id,service_id,company_id , admin_id}
    }else{
      this.toaster.error('you are not Authorized')
      this._Router.navigate(['/login'])
    }
  }

  createTransaction(){
    let customer_id=this.customers.gettingResult()?.id
    let service_id=this.services.gettingResult()?.id
    let userLogged= this._AuthService.currentUser.getValue()
    if (userLogged) {
      const {company_id , id:admin_id}=userLogged ;
      if (this.newTransactionForm.valid && customer_id && service_id) {
        this._TransactionsService.addTransaction({...this.newTransactionForm.value ,customer_id,service_id,company_id , admin_id}).subscribe({
          next :(res)=>{
            console.log(res);
            this.toaster.success("success add transaction","success")
            this.dialog.close(true)
            
          },
          error :(err)=>{
            console.log(err);
          }
        })
      } else {
        this.newTransactionForm.markAllAsTouched() ;
        this.customers.validate();
        this.services.validate();
      }
    }
  }

  updateTransaction(){
    if (this.testChange() && this.newTransactionForm.valid) { 
      let data=this.gatheringData()? this.gatheringData() : null
      console.log(data);
      let {company_id ,...newObject }=data
      this._TransactionsService.updateTransaction(this.data.id  ,newObject).subscribe({
        next: res=>{
          this.toaster.success("success update transaction","success")
          this.dialog.close(true)
        },
        error : err=>{

        }
      })
    }else{
      
    }
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

  testChange(){
    let hasChanges = false
    Object.keys(this.formValues).forEach((item) => { 
      if(this.formValues[item] !== this.newTransactionForm.value[item])   {
        hasChanges= true ;
      }
    })
    
    if (!hasChanges && (this?.data?.customer?.id !== this?.customers?.gettingResult()?.id || this?.data?.service.id !== this.services.gettingResult()?.id)) {
      hasChanges= true ;
    }
    return hasChanges
  }

}