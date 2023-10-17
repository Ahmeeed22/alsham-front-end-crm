import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OwnerService } from '../service/owner.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-owner',
  templateUrl: './add-owner.component.html',
  styleUrls: ['./add-owner.component.scss']
})
export class AddOwnerComponent implements OnInit {
  ownerFormGroup:FormGroup =new FormGroup({
    desc :new FormControl('',[Validators.required]) ,
    amount : new FormControl(0,[Validators.required]),
    type : new FormControl('',[Validators.required])
  })

  constructor(
    public dialog: MatDialogRef<AddOwnerComponent> ,
    private _OwnerService:OwnerService
  ) { }

  ngOnInit(): void {

  }

  save(data:any){
    console.log("test",data);
  }



}
