import {AfterViewInit, Component, ViewChild , OnInit, ElementRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ComfirmationComponent } from 'src/app/shared/comfirmation/comfirmation.component';
import { DdlSearchableComponent } from 'src/app/shared/ddl-searcheble/ddl-searchable/ddl-searchable.component';
import { Item } from 'src/app/shared/ddl-searcheble/models/item';
import { ServicesService } from '../../services.service';
import { AddServiceComponent } from '../add-service/add-service.component';

const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.scss']
})
export class ListServiceComponent implements AfterViewInit {
  filteration :any ={name:null,active:null}
  @ViewChild('name') name !: ElementRef;
  @ViewChild('status') status !: DdlSearchableComponent;
  displayedColumns: string[] = ['index', 'name', 'desc' , 'active' ,'action'];
  dataSource !:any ;
  statusObj : Item= { staticArray:[{id:1,name:' Active'},{id:0,name:'Dis active'}], placeholder: 'الحالة ', placeholderEn: 'Status', required: false, searachable: false, multiSelect: false
      }
  constructor(
    private _ServicesService:ServicesService
    ,private toaster:ToastrService
    ,public dialog: MatDialog
    ){
    this.getAllServices()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
  }
  
  getAllServices(filter?:any){
    this._ServicesService.getAllServicesSearch(filter).subscribe({
      next : (res)=>{
        console.log(res.services);
        for (let index = 0; index < res.services.length; index++) {
          res.services[index].index=index+1
          
        }
        this.dataSource = new MatTableDataSource<any>(res.services);
        this.dataSource.paginator = this.paginator;
        this.toaster.success("success get Services","success")
      }
    })
  }
 
  updateTask(e:any,ele:any){
    const dialogRef = this.dialog.open(AddServiceComponent, {
      width:"60%",
      disableClose:true,
      data:ele,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllServices()
    });

  }
  addService(): void {
    const dialogRef = this.dialog.open(AddServiceComponent, {
      width:"60%",
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllServices()
    });
  }

  deleteService(id:any){
    const dialogRef = this.dialog.open(ComfirmationComponent, {
      width: '750px',
      disableClose:true,
      data : {message :"Are You Sure to Delete ? "}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=='no') {
        this._ServicesService.deleteService(id).subscribe({
          next:()=>{
            this.toaster.success("Service Deleted Succesfully" , "Success")
            this.getAllServices()
          }
        })
      }else{
        this.toaster.info('Service not deleted' , "Info")
      }
    });
  }

  search(e:any,name:any){ 
    // this.resetPagination()
    (this.status.gettingResult()?.id == 0||this.status.gettingResult()?.id ==1) ? this.filteration.active= this.status.gettingResult()?.id:'';
    (name) ? this.filteration.name= name:'';
    this.getAllServices(this.filteration)
  }

  // resetPagination(){
  //   this.filteration.offset=1 ;
  //   this.pageSize = 3;
  //   this.pageIndex =0;
  // }

  resetSearch(){
    this.filteration={}
    this.getAllServices(this.filteration)
    // this.resetPagination();
    this.status.resetList();
   this.name.nativeElement.value=null
  }
}
