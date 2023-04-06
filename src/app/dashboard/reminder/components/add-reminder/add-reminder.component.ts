import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/dashboard/service/services.service';
import { ComfirmationComponent } from 'src/app/shared/comfirmation/comfirmation.component';
import { DdlSearchableComponent } from 'src/app/shared/ddl-searcheble/ddl-searchable/ddl-searchable.component';
import { Item } from 'src/app/shared/ddl-searcheble/models/item';
import { ReminderService } from '../../reminder.service';


@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.scss']
})
export class AddReminderComponent implements OnInit {
  statusObj !: Item ;
  servicesObj !:Item ;
  @ViewChild('services') services !: DdlSearchableComponent;
  @ViewChild('status') status !: DdlSearchableComponent;
  newServiceForm :any;
  formValues:any ;
  minDate:any;
  constructor(
    private fb:FormBuilder ,
    private _Router:Router,
    private toaster:ToastrService,
    private _ReminderService:ReminderService,
    public dialog: MatDialogRef<AddReminderComponent> , 
    public dialogpublic: MatDialog ,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _ServicesService:ServicesService
  ) { 
    this.getStatus();
    this.getServices();
    this.createForm();
  }

  ngOnInit(): void {
  }

  getStatus(){
    console.log(this?.data?.status,"this?.data?.active");
    console.log(this.data,"this.data");
    
    
    let oldSelected=(this?.data?.status=='new' && this.data)? {id:'new',name:' Processed'}:{id:'pending',name:'Not Processed'}
    console.log(oldSelected,"oldSelected");
    
     this.statusObj= { staticArray:[{id:'new',name:' Processed'},{id:'pending',name:'Not Processed'}], placeholder: 'الحالة ', placeholderEn: 'Status', required: true, searachable: false, multiSelect: false, oldSelectedItems: this.data? oldSelected : null
    };
  }
  getServices(){
    this._ServicesService.getAllServices().subscribe({
      next :(res)=>{
       this.servicesObj= { staticArray:res.result.rows, placeholder: 'الخدمة', placeholderEn: 'Service', required: true, searachable: true, multiSelect: false, oldSelectedItems:this?.data?.service
      };
      }
    })
  }
  
  createForm() {
    this.minDate=this.data?.dateExpire||new Date(1/1/2015)
    this.newServiceForm = this.fb.group({
      companyName : [this.data?.companyName || '' , Validators.required],
      sponsored : [this.data?.sponsored || '' , Validators.required],
      message : [this.data?.message || '' , Validators.required],
      dateExpire : [this.data?.dateExpire || null,Validators.min(0) ],
    })

    this.formValues = {...this.newServiceForm.value}
  }

  createReminder(date:any){
    console.log(date);
    
    let finalData={...this.newServiceForm.value,dateExpire:new Date(date.split('-').reverse().join('-')).toISOString(),status:this.status?.gettingResult()?.id,service_id:this.services?.gettingResult()?.id}
    
    console.log(finalData);
    if (this.newServiceForm.valid&&this.services?.validate()&&this.status.validate()) {
      this._ReminderService.addReminder(finalData).subscribe({
        next:(res)=>{
          console.log(res);
          this.toaster.success("success add transaction","success")
          this.dialog.close(true)
        },
        error:err=>{
          this.newServiceForm.markAllAsTouched() ;
        }
      })
    }else{
      this.newServiceForm.markAllAsTouched() ;
      this.status.validate();
      this.services.validate();
    }
    
  }

  updateReminder(date:any){
    if (this.testChange() && this.newServiceForm.valid) { 
      let finalData={...this.newServiceForm.value,dateExpire:new Date(date.split('-').reverse().join('-')).toISOString(),status:this.status?.gettingResult()?.id,service_id:this.services?.gettingResult()?.id}
      console.log(finalData);
      console.log(this.services?.gettingResult());
      
      this._ReminderService.updateRemider(this.data.id  ,finalData).subscribe({
        next: res=>{
          this.toaster.success("success update Reminder","success")
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
}
