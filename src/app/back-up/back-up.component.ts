import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DdlSearchableComponent } from '../shared/ddl-searcheble/ddl-searchable/ddl-searchable.component';
import { Item } from '../shared/ddl-searcheble/models/item';

export interface PeriodicElement {
  name: string;
  email: string;
  tasksAssigned: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', email: "1.0079", tasksAssigned:"10-11-2022" },
  { name: 'Helium', email: "4.0026", tasksAssigned:"10-11-2022" },
  { name: 'Lithium', email: "6.941", tasksAssigned:"10-11-2022" },
  { name: 'Beryllium', email: "9.0122", tasksAssigned:"10-11-2022" },
  { name: 'Boron', email: "10.811", tasksAssigned:"10-11-2022" },
  { name: 'Carbon', email: "12.010", tasksAssigned:"10-11-2022" },
  { name: 'Nitrogen', email: "14.006", tasksAssigned:"10-11-2022" },
  { name: 'Oxygen', email: "15.999", tasksAssigned:"10-11-2022" },
  { name: 'Fluorine', email: "18.998", tasksAssigned:"10-11-2022" },
  {  name: 'Neon', email: "20.179", tasksAssigned:"10-11-2022" },
];
@Component({
  selector: 'app-back-up',
  templateUrl: './back-up.component.html',
  styleUrls: ['./back-up.component.scss']
})
export class BackUpComponent  {
  @Input() statusObj: Item = { staticArray: [{id:1, name: 'Hydrogen', email: "1.0079", tasksAssigned:"10-11-2022" },
  {id:2, name: 'Helium', email: "4.0026", tasksAssigned:"10-11-2022" },
  {id:3, name: 'Lithium', email: "6.941", tasksAssigned:"10-11-2022" },
  {id:4, name: 'Beryllium', email: "9.0122", tasksAssigned:"10-11-2022" },
  {id:5, name: 'Boron', email: "10.811", tasksAssigned:"10-11-2022" },
  { id:6,name: 'Carbon', email: "12.010", tasksAssigned:"10-11-2022" },
  { id:7,name: 'Nitrogen', email: "14.006", tasksAssigned:"10-11-2022" },
  {id:8, name: 'Oxygen', email: "15.999", tasksAssigned:"10-11-2022" },
  {id:9, name: 'Fluorine', email: "18.998", tasksAssigned:"10-11-2022" },
  { id:11, name: 'Neon', email: "20.179", tasksAssigned:"10-11-2022" },
  {id:51, name: 'Boron', email: "10.811", tasksAssigned:"10-11-2022" },
  { id:62,name: 'Carbon', email: "12.010", tasksAssigned:"10-11-2022" },
  { id:73,name: 'Nitrogen', email: "14.006", tasksAssigned:"10-11-2022" },
  {id:83, name: 'Oxygen', email: "15.999", tasksAssigned:"10-11-2022" },], placeholder: 'الحالة', placeholderEn: 'status', required: true, searachable: true, multiSelect: false, };
  @ViewChild('status') status !: DdlSearchableComponent;
  @Output() searchEvent = new EventEmitter();
  name:any;
  selectedStatus:any;
  incomingDDLData: any;

  lang :any;
  typeSelected:any;
  users:any = [
    {name:"Moahmed" , id:1},
    {name:"Ali" , id:2},
    {name:"Ahmed" , id:3},
    {name:"Zain" , id:4},
  ]

    displayedColumns: string[] = ['position', 'name', 'email' ,'tasksAssigned', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(private translate: TranslateService , private spinnerService: NgxSpinnerService , private _formBuilder:FormBuilder) {
    console.log(this.translate.currentLang);
    this.typeSelected = 'ball-fussion';
    if("lang" in localStorage){
      this.lang =localStorage.getItem('lang')
      translate.use(this.lang);
    }else{
      translate.use("en");
    }

    this.spinnerService.show()
    
    setTimeout(() => {
      this.spinnerService.hide()
    }, 3000);

  }


  select(x:any,y:any){
    console.log(this.status.oldselectedItems);
  }
  getiint(){
    this.status.validate()
  }

// side bar toggle 


options = this._formBuilder.group({
  bottom: 0,
  fixed: false,
  top: 0,
});

}
