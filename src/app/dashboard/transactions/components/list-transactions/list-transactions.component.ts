import { PageEvent } from '@angular/material/paginator';
import { Component, OnInit ,ViewChild,ElementRef,Input} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { TransactionsService } from '../../transactions.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { ComfirmationComponent } from 'src/app/shared/comfirmation/comfirmation.component';
import { Item } from 'src/app/shared/ddl-searcheble/models/item';
import { DdlSearchableComponent } from 'src/app/shared/ddl-searcheble/ddl-searchable/ddl-searchable.component';
import { CustomersService } from 'src/app/dashboard/customer/customers.service';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.scss']
})
export class ListTransactionsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadline','status', 'actions'];
  dataSource:any = [];
  tasksFilter!:FormGroup

  customersObj!:Item;
  @ViewChild('customers') customers !: DdlSearchableComponent;
  usersObj!:Item;
  @ViewChild('users') users !: DdlSearchableComponent;
  @ViewChild('start') start !: ElementRef;
  @ViewChild('end') end !: ElementRef;
// pagination setup
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent !: PageEvent;
  filteration:any = {
    offset:this.pageIndex+1,
    limit: this.pageSize,
    date:true
  }
  timeOutId:any

  constructor(
    private _TransactionsService:TransactionsService  
    ,private toaster:ToastrService
    ,public dialog: MatDialog
    ,private _CustomersService:CustomersService
    ,private _AuthService:AuthService
     ) {}

  ngOnInit(): void {
    this.getAllTransactions();
    this.getCustomers();
    this.getUsers();
  }

  getAllTransactions(){
    console.log(this.filteration);
    this.filteration.offset=this.filteration.offset > 0 ? this.filteration.offset - 1 : 0 
    this._TransactionsService.getAllTransactions(this.filteration).subscribe({
      next:(res)=>{
        this.length=res.result.count
        this.dataSource=res.result.rows
        this.toaster.success("success get Transactions","success")
      }
    })
  }
  getCustomers(){
    this._CustomersService.getAllCustomers().subscribe({
      next :(res)=>{
        console.log(res);
        this.customersObj= { staticArray:res.result.rows, placeholder: 'العميل', placeholderEn: 'Search By Customer', required: false, searachable: true, multiSelect: false };
      }
    })
  }
  getUsers(){
    this._AuthService.getAllUser().subscribe({
      next :(res)=>{
        console.log(res.users.rows);
        this.usersObj= { staticArray:res.users.rows, placeholder: 'الموظف', placeholderEn: 'Search By Employee', required: false, searachable: true, multiSelect: false };
      }
    })
  }


  updateTask(e:any,ele:any){
    const dialogRef = this.dialog.open(AddTransactionComponent, {
      width:"60%",
      disableClose:true,
      data:ele,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllTransactions()
    });

  }
  deleteTask(id:any){
    const dialogRef = this.dialog.open(ComfirmationComponent, {
      width: '750px',
      disableClose:true,
      data : {message :"Are You Sure to Delete ? "}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=='no') {
        this._TransactionsService.deleteTransaction(id).subscribe({
          next:()=>{
            this.toaster.success("Transaction Deleted Succesfully" , "Success")
            this.getAllTransactions()
          }
        })
      }else{
        this.toaster.info('Transaction not deleted' , "Info")
      }
    });


  }

  search(e:any,start:any,end:any){ 
    start?this.filteration.startedDate= new Date(start.split('-').reverse().join('-')).toISOString():'' ;
    end?this.filteration.endDate=new Date(end.split('-').reverse().join('-')).toISOString():'' ;
    // this.resetPagination()
    (this.customers.gettingResult()?.id) ? this.filteration.customer_id= this.customers.gettingResult()?.id:'';
    (this.users.gettingResult()?.id) ? this.filteration.admin_id= this.users.gettingResult()?.id:'';
    console.log(this.filteration);
    
    this.getAllTransactions()
  }

  resetPagination(){
    this.filteration.offset=1 ;
    this.pageSize = 3;
    this.pageIndex =0;
  }

  resetSearch(start:any,end:any){
    const {limit ,offset ,...reset}=this.filteration
    this.filteration={limit,offset}
    this.getAllTransactions()
    this.resetPagination();
    this.customers.resetList();
    this.users.resetList();
   this.start.nativeElement.value=null
   this.end.nativeElement.value=null
   
  }
  // configration for pagination
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.filteration.offset=e.pageIndex+1 ;
    this.filteration.limit=e.pageSize ;
    this.getAllTransactions()
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  addTask(): void {
    const dialogRef = this.dialog.open(AddTransactionComponent, {
      width:"60%",
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllTransactions()
    });
  }
}
