import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  @ViewChild('suppliers') suppliers !: DdlSearchableComponent;
  suppliersObj!:Item;
  @ViewChild('banks') banks !: DdlSearchableComponent;
  banksObj!:Item;
  @ViewChild('services') services !: DdlSearchableComponent;
  servicesObj!:Item;
  @ViewChild('customers') customers !: DdlSearchableComponent;
  customersObj!:Item;
  newTransactionForm :any;
  formValues:any ;
  customerDeposite:any;
  customerName:any;
  customerSelected:any ;
  public isVisaChecked: boolean = false;
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
      this.getAllSuppliers();
      this.getAllBanksAccounts();
    }

  ngOnInit(): void {
    this.newTransactionForm?.get("paymentAmount").valueChanges.subscribe(()  => {
       this.newTransactionForm.get('balanceDue').patchValue(((this.newTransactionForm.value.price + this.newTransactionForm.value.profite)*(this.newTransactionForm.value.quantity))-this.newTransactionForm?.get("paymentAmount").value)
    })

    this.newTransactionForm?.get("balanceDue").valueChanges.subscribe(()  => {
      setTimeout(() => {
        this.newTransactionForm.get('paymentAmount').patchValue(((this.newTransactionForm.value.price + this.newTransactionForm.value.profite)*(this.newTransactionForm.value.quantity))-this.newTransactionForm?.get("balanceDue").value)
     },500)
      } );

    // handle deposite 
    this.newTransactionForm.get("profite").valueChanges.subscribe (():any=>{
       if (this.customerDeposite ===0) return null;
        setTimeout(()=>{
          if (this.newTransactionForm.value.price && this.newTransactionForm.value.profite && this.newTransactionForm.value.quantity) {
            var totalPrice=(this.newTransactionForm.value.price + this.newTransactionForm.value.profite)*(this.newTransactionForm.value.quantity) ;
            if (this.customerDeposite >= totalPrice) {
              this.newTransactionForm.get('balanceDue').patchValue(0) ;
              // this.newTransactionForm.get('paymentAmount').patchValue(totalPrice) ;
              // update here customer deposite
  
            } else {
              // this.newTransactionForm.get('balanceDue').patchValue(totalPrice-this.customerDeposite) ;
              this.newTransactionForm.get('paymentAmount').patchValue(this.customerDeposite) ;
            }
          }
        },100)
      })
  }
  

  createForm() {
    console.log(this.data);
    
    this.newTransactionForm = this.fb.group({
      quantity : [this.data?.quantity || 0 , Validators.required],
      balanceDue : [this.data?.balanceDue || 0 , Validators.required],
      paymentAmount : [this.data?.paymentAmount || 0 , Validators.required],
      profite : [this.data?.profite || 0 , Validators.required],
      commission : [this.data?.commission || 0 , Validators.required],
      price : [this.data?.price || 0 , Validators.required],
      sponsoredName : [this.data?.sponsoredName || null , Validators.required],
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

  updateCustomerDeposite(id:number,body:any){
    this._CustomersService.updateCustomer(id,body).subscribe({
      next : (res)=>{
        this.toaster.success("customer deposite success updated","Success")
      }
    })
  }

  gatheringData(){
    let customer_id=this.customers.gettingResult()?.id
    let service_id=this.services.gettingResult()?.id
    // let supplierId=this.suppliers.gettingResult()?.id || null ;
    // let accountId=this.banks.gettingResult()?.id || null ;
    let visa=true
    let userLogged= this._AuthService.currentUser.getValue()
    if (userLogged) {
      const {company_id , id:admin_id}=userLogged ;
      return {...this.newTransactionForm.value ,customer_id,service_id,company_id , admin_id: this.data ?this.data.admin_id:admin_id ,visa}
    }else{
      this.toaster.error('you are not Authorized')
      this._Router.navigate(['/login'])
    }
  }

  createTransaction(){
    let customer_id=this.customers.gettingResult()?.id
    let service_id=this.services.gettingResult()?.id
    let supplierId=this.suppliers?.gettingResult()?.id || null ;
    let accountId=this.banks?.gettingResult()?.id || null ;
    let visa=true
    let userLogged= this._AuthService.currentUser.getValue()
    if (userLogged && (supplierId||accountId)) {
      const {company_id , id:admin_id}=userLogged ;
      if (this.newTransactionForm.valid && customer_id && service_id) {
        if (this.customerDeposite>0) {
          var totalPrice=(this.newTransactionForm.value.price + this.newTransactionForm.value.profite)*(this.newTransactionForm.value.quantity) ;
          
          if (this.customerDeposite >= totalPrice ) {
            if (this.newTransactionForm.get('balanceDue').value !=0) {
              this.toaster.warning("this customer have deposite more than total price must balance equal zero") ;
              return ;
            }
            // update here customer deposite
            this._CustomersService.updateCustomer(this.customerSelected.id,{deposite :this.customerSelected.deposite-totalPrice ,transactionEndPoint:true}).subscribe({
              next :(res)=>{
                console.log(res);
                
                this.toaster.success("customer deposite updated","success") ;
                // add deposit history 
              }
            })

          } else {
            // update here customer deposite
            if (this.newTransactionForm.get('paymentAmount').value < this.customerSelected.deposite) {
              this.toaster.warning("this customer have deposite more than payment amount ") ;
              return ;
            }
            // update here customer deposite
            this._CustomersService.updateCustomer(this.customerSelected.id,{deposite :0}).subscribe({
              next :(res)=>{
                this.toaster.success("customer deposite updated","success")
              }
            })


          }
        }

        this._TransactionsService.addTransaction({...this.newTransactionForm.value ,customer_id,service_id,company_id , admin_id,visa,accountId,supplierId}).subscribe({
          next :(res)=>{
            this.toaster.success("success add transaction","success")
            console.log(res.result.id);

            // add deposite history
            if (this.customerDeposite>0) {
              this._TransactionsService.addDipostHistory({type: 'withdraw' , details : `${this.newTransactionForm.get('sponsoredName').value} ` ,customerId :this.customerSelected.id , amount:+this.newTransactionForm.get('paymentAmount').value ,deposite :
              this.customerDeposite >= totalPrice ? this.customerSelected.deposite-totalPrice : 0
             }).subscribe((res)=>{
                console.log(res);
                this.toaster.success("success add Deposit History","success")
                
              })
            }

            this.dialog.close(true)
          }
        })
      } else {
        this.newTransactionForm.markAllAsTouched() ;
        this.customers.validate();
        this.services.validate();
        this.isVisaChecked? this.suppliers.validate() :  this.banks.validate();
       
        ;
      }
    } 
    else{
      this.toaster.warning("please select bank account or supplier ") ;
    }
  }

  updateTransaction(){
    console.log(this.newTransactionForm);
    let customer_id=this.customers.gettingResult()?.id
    let service_id=this.services.gettingResult()?.id
    let supplierId=this.suppliers?.gettingResult()?.id || null ;
    let accountId=this.banks?.gettingResult()?.id || null ;
    if (this.testChange() && this.newTransactionForm.valid) { 
      let data=this.gatheringData()? this.gatheringData() : null
      let {company_id ,balanceDue,paymentAmount,sponsoredName,...newObject }=data
      this._TransactionsService.updateTransaction(this.data.id  ,{...this.newTransactionForm.value ,customer_id,service_id}).subscribe({
        next: res=>{
          console.log(res);
          this.toaster.success("success update transaction","success")
          this.dialog.close(true)
        }
      })
    }else{
      this.toaster.info("No Data Edited" , "info")
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

  gettingDeposite(event:any){
    this.customerSelected={...event}
    this.customerDeposite=event.deposite
    this.customerName=event.name
  }

  getAllBanksAccounts(){
    this._TransactionsService.getAllBankAccount().subscribe({
      next:(res)=>{
        console.log(res);
        this.banksObj= { staticArray:res.result.rows, placeholder: 'البنك', placeholderEn: 'Bank Account', required: !this.isVisaChecked, searachable: true, multiSelect: false, oldSelectedItems:this?.data?.service
      };
        
      },
      error :(err)=>{
        console.log(err);
        
      }
  })
}

getAllSuppliers(){
  this._TransactionsService.getAllsuppliers().subscribe({
    next:(res)=>{
      console.log(res);
      this.suppliersObj= { staticArray:res.result.rows, placeholder: 'المورد', placeholderEn: 'Supplier', required: this.isVisaChecked, searachable: true, multiSelect: false, oldSelectedItems:this?.data?.service
    };
      
    },
    error :(err)=>{
      console.log(err);
      
    }
})
}



onCheckboxChange(event: any) {
  this.isVisaChecked = event.target.checked;
  if (this.isVisaChecked) {
    this.suppliersObj= { staticArray:this.suppliersObj.staticArray, placeholder: 'المورد', placeholderEn: 'Supplier', required: this.isVisaChecked, searachable: true, multiSelect: false, oldSelectedItems:this?.data?.service
  };
  } else {
    this.banksObj= { staticArray:this.banksObj.staticArray, placeholder: 'البنك', placeholderEn: 'Bank Account', required: !this.isVisaChecked, searachable: true, multiSelect: false, oldSelectedItems:this?.data?.service
  };
  }
}

}