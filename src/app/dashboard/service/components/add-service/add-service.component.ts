import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ComfirmationComponent } from 'src/app/shared/comfirmation/comfirmation.component';
import { DdlSearchableComponent } from 'src/app/shared/ddl-searcheble/ddl-searchable/ddl-searchable.component';
import { Item } from 'src/app/shared/ddl-searcheble/models/item';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent  {
  statusObj !: Item ;
  @ViewChild('status') status !: DdlSearchableComponent;
  newServiceForm :any;
  formValues:any ;
  constructor(
    private _ServicesService:ServicesService,
    private fb:FormBuilder ,
    private _AuthService:AuthService , 
    private _Router:Router,
    private toaster:ToastrService,
    public dialog: MatDialogRef<AddServiceComponent> , 
    public dialogpublic: MatDialog ,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.getStatus();
    this.createForm()
  }
  createForm() {
    this.newServiceForm = this.fb.group({
      name : [this.data?.name || '' , Validators.required],
      desc : [this.data?.desc || '' , Validators.required],
    })
    this.formValues = {...this.newServiceForm.value}
  }

  getStatus(){
      let oldSelected=(this?.data?.active && this.data)? {id:1,name:' Active'}:{id:0,name:'Dis active'}
       this.statusObj= { staticArray:[{id:1,name:' Active'},{id:0,name:'Dis active'}], placeholder: 'الحالة ', placeholderEn: 'Status', required: true, searachable: false, multiSelect: false, oldSelectedItems: this.data? oldSelected : null
      };
  }

  gatheringData(){
    let active=this.status.gettingResult()?.id
    let userLogged= this._AuthService.currentUser.getValue()
    if (userLogged) {
     return {...this.newServiceForm.value , active}
    }else{
      this.toaster.error('you are not Authorized')
      this._Router.navigate(['/login'])
    }
  }

  createService(){
    let active=this.status.gettingResult()?.id
    let userLogged= this._AuthService.currentUser.getValue() ;
    if (userLogged) {
      if (this.newServiceForm.valid && this.status.validate()) {
        this._ServicesService.addService({...this.newServiceForm.value ,active}).subscribe({
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

  updateService(){
    if (this.testChange() && this.newServiceForm.valid) { 
      let data=this.gatheringData()? this.gatheringData() : null
      this._ServicesService.updateService(this.data.id  ,data).subscribe({
        next: res=>{
          this.toaster.success("success update Service","success")
          this.dialog.close(true)
        },
        error : err=>{
          this.newServiceForm.markAllAsTouched() ;
          this.status.validate();
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
      if(this.formValues[item] !== this.newServiceForm.value[item])   {
        hasChanges= true ;
      }
    })
    if (!hasChanges && ( this?.data?.active != this.status.gettingResult()?.id)) {
      hasChanges= true ;
    }
    return hasChanges
  }
}
