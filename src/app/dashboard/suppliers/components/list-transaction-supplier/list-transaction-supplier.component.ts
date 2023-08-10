import { Component, OnInit } from '@angular/core';
import { SppliersService } from '../../sppliers.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSupplierTransactionComponent } from '../add-supplier-transaction/add-supplier-transaction.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-transaction-supplier',
  templateUrl: './list-transaction-supplier.component.html',
  styleUrls: ['./list-transaction-supplier.component.scss']
})
export class ListTransactionSupplierComponent implements OnInit {
  dataSource:any=[] ;
  suppliers:any=[] ;
  suppierStatements:any=[] ;
  selectedSupplier:any= {} ;
  constructor(private _SppliersService:SppliersService , private dialog:MatDialog , private toaster:ToastrService) {
    this.getAllSuppliers()
    
   }

  ngOnInit(): void {
  }

  getAllSuppliers(){
    this._SppliersService.getAllSuppliers().subscribe({
      next:(res)=>{
        this.suppliers=res.result.rows ;
        this.selectedSupplier=this.suppliers[0]
        this.getAllSuppliersStatement()
        
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getAllSuppliersStatement(){
    this._SppliersService.getAllSuppliersStatements().subscribe({
      next :res=>{
        this.dataSource=res.result.rows ;
        this.onSuppierChange(null,this.selectedSupplier)
        this.toaster.success("Success Getting Suppliers Statements","Success")
        
      },
      error :(err)=>{
        this.toaster.error("faild  Getting Suppliers Statements","Error")
      }
    })
  }

  onSuppierChange(e:any,items:any={}){
    this.suppierStatements=this.dataSource.filter((item:any)=>{
      this.selectedSupplier=e?.value ? e?.value:items;
      return item.supplierId	=== this.selectedSupplier.id
    })
    
  }

  addSupplierStatement(){
    const dialogRef = this.dialog.open(AddSupplierTransactionComponent, {
      width:"60%",
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllSuppliers() ;
    });
  }

}
