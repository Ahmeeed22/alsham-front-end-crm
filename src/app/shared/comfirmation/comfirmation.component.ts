import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comfirmation',
  templateUrl: './comfirmation.component.html',
  styleUrls: ['./comfirmation.component.scss']
})
export class ComfirmationComponent{
  constructor( public dialog: MatDialogRef<ComfirmationComponent> , 
    public matDialog:MatDialog, @Inject(MAT_DIALOG_DATA) public data:any,) { }

  confirm(){
    this.dialog.close(true)
    this.matDialog.closeAll();
  }

  close(){
    this.dialog.close('no');
  }
}
