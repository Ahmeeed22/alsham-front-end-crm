import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
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

  constructor(private translate: TranslateService , private spinnerService: NgxSpinnerService) {
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



}
