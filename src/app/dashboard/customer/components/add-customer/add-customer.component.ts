import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TransactionsService } from 'src/app/dashboard/transactions/transactions.service';
import { ComfirmationComponent } from 'src/app/shared/comfirmation/comfirmation.component';
import { DdlSearchableComponent } from 'src/app/shared/ddl-searcheble/ddl-searchable/ddl-searchable.component';
import { Item } from 'src/app/shared/ddl-searcheble/models/item';
import { CustomersService } from '../../customers.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  statusObj !: Item ;
  @ViewChild('status') status !: DdlSearchableComponent;
  newServiceForm :any;
  formValues:any ;
  increaseValue: number=0; // Variable for Increase Deposite By
  decreaseValue: number=0; // Variable for Decrease Deposite By

  constructor(
    private _CustomersService:CustomersService,
    private fb:FormBuilder ,
    private _AuthService:AuthService , 
    private _Router:Router,
    private toaster:ToastrService,
    public dialog: MatDialogRef<AddCustomerComponent> , 
    public dialogpublic: MatDialog ,
    private _TransactionsService:TransactionsService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.getStatus();
    this.createForm()
   }

  ngOnInit(): void {
    this.gatheringData() ;
    console.log(this.data);
    if (this.data ) {
      // this.disableDeposite()
    }
    
  }

  createForm() {
    this.newServiceForm = this.fb.group({
      name : [this.data?.name || '' , Validators.required],
      email : [this.data?.email || 'test@gmail.com' ,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      phoneNo : [this.data?.phoneNo || '5414658854' ],
      deposite : [this.data?.deposite || 0 ,Validators.min(0) ],
    })

    this.formValues = {...this.newServiceForm.value}
  }
  disableDeposite() {
    this.newServiceForm.get('deposite')?.disable();
  }
  getStatus(){
      let oldSelected=(this?.data?.active && this.data)? {id:1,name:' Active'}:{id:0,name:'Dis active'}
       this.statusObj= { staticArray:[{id:1,name:' Active'},{id:0,name:'Dis active'}], placeholder: 'الحالة ', placeholderEn: 'Status', required: true, searachable: false, multiSelect: false, oldSelectedItems: this.data? oldSelected : null
      };
  }

  gatheringData(){
    let active=this.status?.gettingResult()?.id
    let userLogged= this._AuthService.currentUser.getValue()
    if (userLogged) {
     const {company_id , id:admin_id}=userLogged ;
     return {...this.newServiceForm.value , active , company_id , admin_id}
    }else{
      this.toaster.error('you are not Authorized')
      this._Router.navigate(['/login'])
    }
  }

  createCustomer(){
    let userLogged= this._AuthService.currentUser.getValue()
    if (userLogged ) {
      if (this.newServiceForm.valid && this.status.validate()) {
        let data=this.gatheringData()? this.gatheringData() : null
        this._CustomersService.addCustomer(data).subscribe({
          next :(res)=>{
            this.toaster.success("success add Service","success")
            this.dialog.close(true)
          }
        })
      } else {
        this.newServiceForm.markAllAsTouched() ;
        this.status.validate();
      }
    }
  }
  
  updateCustomer(){
    console.log(this.newServiceForm.valid);
    console.log(this.testChange());
    
    if (this.testChange() && this.newServiceForm.valid) { 
      let data=this.gatheringData()? this.gatheringData() : null


//
      // if (data.deposite) {
      //   this._TransactionsService.getAllTransactions({customer_id:this.data.id , balanceDue:1}).subscribe({
      //     next : (res)=>{
      //       console.log(res);
      //       console.log(res.allProfite[0].balanceDue);
      //       if(res.allProfite[0].balanceDue ){
      //         this.toaster.warning(`failed update Customer because he have balance = ${res.allProfite[0].balanceDue} at ${res.result.count} transactions`,"success")
      //       }else{
      //         this._CustomersService.updateCustomer(this.data.id  ,data).subscribe({
      //           next: res=>{
      //             console.log(res);
                  
      //             this.toaster.success("success update Customer","success")
      //             this.dialog.close(true)
      //           },
      //           error:(err)=>{
      //             console.log(err);
                  
      //           }
      //         })
      //       }
      //     },
      //     error:(err)=>{
      //       console.log(err);
            
      //     }
      //   }) 
      // }else{



        this._CustomersService.updateCustomer(this.data.id  ,data).subscribe({
          next: res=>{
            console.log(res);
            
            this.toaster.success("success update Customer","success")
            this.dialog.close(true)
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
//
      // }
      
    }else{
      this.newServiceForm.markAllAsTouched() ;
      this.status.validate();
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
      if(this.formValues[item] !== this.newServiceForm.value[item])   {
        hasChanges= true ;
      }
    })

    if (!hasChanges && ( this?.data?.active != this.status.gettingResult()?.id)) {
      hasChanges= true ;
    }
    return hasChanges
  }

  onInputChange(type:string) {
    // Handle changes in both input fields
    if (type=='Increase') {
      this.decreaseValue = 0 ;
      this.newServiceForm.get('deposite').patchValue(this.increaseValue+this.data?.deposite)
    } else if (type =='Decrease') {
      this.increaseValue=0 ;
      this.newServiceForm.get('deposite').patchValue(this.data?.deposite-this.decreaseValue)
    } else {
    }{
      console.log("error");
    }
  }

}