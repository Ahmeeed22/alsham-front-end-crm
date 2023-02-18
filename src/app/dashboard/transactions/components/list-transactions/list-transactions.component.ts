import { PageEvent } from '@angular/material/paginator';
import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { TransactionsService } from '../../transactions.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { ComfirmationComponent } from 'src/app/shared/comfirmation/comfirmation.component';


@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.scss']
})
export class ListTransactionsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadline','status', 'actions'];
  dataSource:any = [];
  tasksFilter!:FormGroup
  users:any = [
    {
      name:"Ahmed",
      id:"63d36463a5a313fca07f9997"
    }, {
      name:"Sayed",
      id:"63d3648ca5a313fca07f999a"
    },
  ]

  status:any = [
    // {name:this.translate.instant("tasks.Complete"),id:1 },
    // {name:this.translate.currentLang=='en'?"In-Progress":'جاري التنفيذ' ,id:2},
  ]
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
    limit: this.pageSize
  }
  timeOutId:any

  constructor(private _TransactionsService:TransactionsService  ,private toaster:ToastrService,public dialog: MatDialog ) {}

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions(){
    console.log(this.filteration);
    this.filteration.offset=this.filteration.offset > 0 ? this.filteration.offset - 1 : 0 
    console.log(this.filteration);
    
    this._TransactionsService.getAllTransactions(this.filteration).subscribe({
      next:(res)=>{
        console.log(res.result.rows);
        this.length=res.result.count
        this.dataSource=res.result.rows
        console.log(this.dataSource);
        this.toaster.success("success get Transactions","success")
        
      },
      error:(err)=>{
        // console.log(err);
        // this.toaster.error('errrrrror')
      }
    })
  }

  updateTask(e:any,ele:any){
    console.log(ele);
    
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
      console.log(result);
      
      if(result!=='no') {
        this._TransactionsService.deleteTransaction(id).subscribe({
          next:()=>{
            this.toaster.success("Transaction Deleted Succesfully" , "Success")
            this.getAllTransactions()
          },
          error : ()=>{
            // this.toaster.error("Task Deleted faild" , "Faild")
          }
        })
      }else{
        this.toaster.info('Transaction not deleted' , "Info")
      }
    });


  }
  selectStatus(e:any){
    console.log(e.value);
    this.resetPagination()
    this.filteration.status=e.value ;
    this.getAllTransactions()
  }
  selectUser(e:any){
    this.resetPagination()
    this.filteration['userId']=e.value
    this.getAllTransactions()  
  }
  
  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  resetDateRange(){
    this.range.reset();
    this.filteration.fromDate=null
    this.filteration.toDate=null
    this.resetPagination()
    this.getAllTransactions() 
  }

  selectData(e:any,type:any){
    this.resetPagination()
    this.filteration[type]= moment(e.value).format('DD-MM-YYYY') ;
   (type==='toDate' && this.filteration.toDate !=='Invalid date')? this.getAllTransactions() : ''
  }
  search(e:any){
    this.resetPagination()
    this.filteration.keyword= e.value ;
    clearTimeout( this.timeOutId)
    this.timeOutId=setTimeout(() => {
      this.getAllTransactions()
    }, 600);    

  }

  resetPagination(){
    this.filteration.offset=1 ;
    this.pageSize = 3;
    this.pageIndex =0;
  }

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
      // height:"90%",
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllTransactions()

    });
  }
}
