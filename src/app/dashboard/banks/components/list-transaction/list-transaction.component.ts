import { Component, OnInit } from '@angular/core';
import { BanksService } from '../../banks.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.scss']
})
export class ListTransactionComponent implements OnInit {
  dataSource:any=[] ;
  banks:any=[] ;
  banksStatements:any=[] ;
  selectedBank:any= {} ;
  constructor(private _BanksService:BanksService , private dialog:MatDialog  , private toaster:ToastrService) {
    this.getAllbanks() ;
    
   }

  ngOnInit(): void {
  }

  getAllbanks(){
    this._BanksService.getAllBanks().subscribe({
      next:(res)=>{
        this.banks=res.result.rows ;
        this.selectedBank=this.banks[0]
        this.getAllbanksStatement()
        
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getAllbanksStatement(){
    this._BanksService.getAllBanksStatements().subscribe({
      next :res=>{
        this.dataSource=res.result.rows ;
        this.onBankChange(null,this.selectedBank)
        this.toaster.success("Success Getting Banks Statements","Success")
        
      },
      error :(err)=>{
        this.toaster.error("faild  Getting Banks Statements","Error")
      }
    })
  }

  onBankChange(e:any,items:any={}){
    this.banksStatements=this.dataSource.filter((item:any)=>{
      this.selectedBank=e?.value ? e?.value:items;
      return item.accountId	=== this.selectedBank.id
    })
    
  }

  addbankstatement(){
    const dialogRef = this.dialog.open(AddTransactionComponent, {
      width:"60%",
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllbanksStatement();
      this.getAllbanks() ;
    });
  }

}
