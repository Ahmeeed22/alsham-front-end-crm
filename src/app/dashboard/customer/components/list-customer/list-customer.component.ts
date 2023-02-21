import {AfterViewInit, Component, ViewChild , OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CustomersService } from '../../customers.service';


const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements AfterViewInit {
  displayedColumns: string[] = ['index', 'name', 'email' , 'phoneNo','active' ,'action'];
  dataSource !:any;
  constructor(private _CustomersService:CustomersService) { 
    this.getAllCustomers()
  }



@ViewChild(MatPaginator) paginator!: MatPaginator;

ngAfterViewInit() {
}

getAllCustomers(){
  this._CustomersService.getAllCustomersSearch().subscribe({
    next : (res)=>{
      console.log(res.result);
      this.dataSource = new MatTableDataSource<any>(res.result);
      this.dataSource.paginator = this.paginator;
    },
    error : (err)=>{
      console.log(err);
    }
  })
}


}

