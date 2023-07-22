import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ComfirmationComponent } from 'src/app/shared/comfirmation/comfirmation.component';
import { Item } from 'src/app/shared/ddl-searcheble/models/item';
import { DdlSearchableComponent } from 'src/app/shared/ddl-searcheble/ddl-searchable/ddl-searchable.component';
import { AddComponent } from '../add/add.component';
import { TransactionAccountService } from '../../services/transaction-account.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('start') start !: ElementRef;
  @ViewChild('end') end !: ElementRef;
  @ViewChild('name') name !: ElementRef;
  dataSource !: any;
  displayedColumns: string[] = ['index', 'type', 'receiptNumber', 'amount','createdAt'];
  minDate:any= new Date(1990, 0, 1);
  @ViewChild('type') type !: DdlSearchableComponent;
  statusObj : Item= { staticArray:[{id:'supply',name:' Supply'},{id:'expenses',name:'Expenses'}], placeholder: 'الحالة ', placeholderEn: 'Type', required: false, searachable: false, multiSelect: false}
  sumAmount:number=0;
  filter: any = {} ;
  constructor(private _TransactionAccountService: TransactionAccountService
    , private toaster: ToastrService
    , public dialog: MatDialog
  ) {
    this.getAllTransactionAccount()
  }

  ngOnInit(): void {
  }
  makeValidationMax(start:any){
    console.log("test",start);
    this.minDate=new Date(start);
  }
  getAllTransactionAccount(filter?:any){
    console.log("filter = ",filter);
    
    this._TransactionAccountService.getAllTransactionAccount(filter).subscribe({
      next: (res) => {
        console.log(res.result.sum.rows[0]?.amount);
        console.log(res);
        
        this.dataSource = new MatTableDataSource<any>(res.result.transactionAccount.rows);
        this.sumAmount=res.result.sum.rows[0]?.amount || 0 ;
        this.dataSource.paginator = this.paginator;
        this.toaster.success("success get Expenses and supply", "success")
      } 
    })
  }

  addTransactionAccount() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: "60%",
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllTransactionAccount()
    });
  }

  search(e: any, date: any, endDate: any ) {
    console.log(this.type.gettingResult());
    this.type.gettingResult()?.id ? this.filter.type=this.type.gettingResult()?.id : "" ;
    if (date || endDate || this.type.gettingResult()?.id ) {
      if (date) {
        this.filter.startedDate = new Date(date.split('-').reverse().join('-')).toISOString()
      }
      if (endDate) {
        this.filter.endDate = new Date(endDate.split('-').reverse().join('-')).toISOString()
      }
      this.getAllTransactionAccount(this.filter)
    } else {
      this.toaster.info('please select search criteria', "Info")
    }


  }

  resetSearch() {
    this.start.nativeElement.value = null;
    this.end.nativeElement.value = null;
    this.type.resetList()
    this.filter={}
    this.getAllTransactionAccount()

  }

  updateTransactionAccount(e: any, el: any) {
    const dialogRef = this.dialog.open(AddComponent, {
      width: "60%",
      disableClose: true,
      data: el,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllTransactionAccount()
    });

  }

  deleteTransactionAccount(id: any) {
    const dialogRef = this.dialog.open(ComfirmationComponent, {
      width: '750px',
      disableClose: true,
      data: { message: "Are You Sure to Delete ? " }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'no') {
        this._TransactionAccountService.deleteTransactionAccount(id).subscribe({
          next: () => {
            this.toaster.success("Supply and Expenses Deleted Succesfully", "Success")
            this.getAllTransactionAccount()
          }
        })
      } else {
        this.toaster.warning('Supply and Expenses not deleted', "Warning")
      }
    });
  }

}
