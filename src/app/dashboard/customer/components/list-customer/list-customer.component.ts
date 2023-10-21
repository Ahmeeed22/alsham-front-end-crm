import {AfterViewInit, Component, ViewChild , OnInit, ElementRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ComfirmationComponent } from 'src/app/shared/comfirmation/comfirmation.component';
import { DdlSearchableComponent } from 'src/app/shared/ddl-searcheble/ddl-searchable/ddl-searchable.component';
import { Item } from 'src/app/shared/ddl-searcheble/models/item';
import { CustomersService } from '../../customers.service';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { DepositHistoryComponent } from '../deposit-history/deposit-history.component';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent {
  filteration :any ={name:null,active:null}
  @ViewChild('name') name !: ElementRef;
  @ViewChild('status') status !: DdlSearchableComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  statusObj : Item= { staticArray:[{id:1,name:' Active'},{id:0,name:'Dis active'}], placeholder: 'الحالة ', placeholderEn: 'Status', required: false, searachable: false, multiSelect: false
      }
  displayedColumns: string[] = ['index', 'name', 'email' , 'phoneNo','deposite','active' ,'action'];
  dataSource !:any;
  constructor(
    private _CustomersService:CustomersService
    ,private toaster:ToastrService
    ,public dialog: MatDialog
    ) { 
    this.getAllCustomers()
  }

getAllCustomers(filter?:any){
  this._CustomersService.getAllCustomersSearch(filter).subscribe({
    next : (res)=>{
      for (let index = 0; index < res.result.length; index++) {
        res.result[index].index=index+1
        
      }
      this.dataSource = new MatTableDataSource<any>(res.result);
      this.dataSource.paginator = this.paginator;
      this.toaster.success("success get Customers","success")
    }
  })
}

updateCustomer(e:any,ele:any){
  const dialogRef = this.dialog.open(AddCustomerComponent, {
    width:"60%",
    disableClose:true,
    data:ele,
  });

  dialogRef.afterClosed().subscribe(result => {
    this.getAllCustomers()
  });

}
addCustomer(): void {
  const dialogRef = this.dialog.open(AddCustomerComponent, {
    width:"60%",
    disableClose:true
  });
  dialogRef.afterClosed().subscribe(result => {
    this.getAllCustomers()
  });
}

getCustomerDepositHistory(data :any){
  const dialogRef = this.dialog.open(DepositHistoryComponent , {
    width : "70%",
    disableClose : false ,
    data ,
    panelClass: 'scrollable-dialog' // Add the custom CSS class here
    })
}

deleteCustomer(id:any){
  const dialogRef = this.dialog.open(ComfirmationComponent, {
    width: '750px',
    disableClose:true,
    data : {message :"Are You Sure to Delete ? "}
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result!=='no') {
      this._CustomersService.deleteCustomer(id).subscribe({
        next:()=>{
          this.toaster.success("Customer Deleted Succesfully" , "Success")
          this.getAllCustomers()
        }
      })
    }else{
      this.toaster.info('Customer not deleted' , "Info")
    }
  });
}

search(e:any,name:any){ 
  // this.resetPagination() 
  (this.status.gettingResult()?.id == 0||this.status.gettingResult()?.id ==1) ? this.filteration.active= this.status.gettingResult()?.id:'';
  (name) ? this.filteration.name= name:'';
  this.getAllCustomers(this.filteration)
}


resetSearch(){
  this.filteration={}
  this.getAllCustomers(this.filteration)
  // this.resetPagination();
  this.status.resetList();
 this.name.nativeElement.value=null
}

}

