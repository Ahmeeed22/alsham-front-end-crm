import { Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  lang :any;
  typeSelected:any;
  constructor( private spinnerService: NgxSpinnerService ) {
    console.log("hello from new dyploy");
    
    this.typeSelected = 'ball-fussion';
    // if("lang" in localStorage){
    //   this.lang =localStorage.getItem('lang')
    //   translate.use(this.lang);
    // }else{
    //   translate.use("en");
    // }

    this.spinnerService.show()
    
    setTimeout(() => {
      this.spinnerService.hide()
    }, 3000);

  }




}
