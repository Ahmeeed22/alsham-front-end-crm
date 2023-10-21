import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-deposit-history',
  templateUrl: './deposit-history.component.html',
  styleUrls: ['./deposit-history.component.scss']
})
export class DepositHistoryComponent implements OnInit {

  constructor(
    private _MatDialog:MatDialog ,
    private _MatDialogRef:MatDialogRef<DepositHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    console.log(data);
    
  }

  ngOnInit(): void {
  }


  close(){
    this._MatDialogRef.close()
  }
}
