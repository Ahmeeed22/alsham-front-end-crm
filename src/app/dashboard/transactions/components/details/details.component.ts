import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<DetailsComponent> , 
    public dialogpublic: MatDialog ,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    console.log(data);
  }

  ngOnInit(): void {
  }

  close(){
      this.dialog.close()
  }

}
