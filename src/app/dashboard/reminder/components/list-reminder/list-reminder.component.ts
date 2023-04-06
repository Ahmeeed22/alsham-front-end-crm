import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ReminderService } from '../../reminder.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ComfirmationComponent } from 'src/app/shared/comfirmation/comfirmation.component';
import { AddReminderComponent } from '../add-reminder/add-reminder.component';
@Component({
  selector: 'app-list-reminder',
  templateUrl: './list-reminder.component.html',
  styleUrls: ['./list-reminder.component.scss']
})
export class ListReminderComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('start') start !: ElementRef;
  @ViewChild('end') end !: ElementRef;
  @ViewChild('name') name !: ElementRef;
  dataSource !: any;
  displayedColumns: string[] = ['index', 'companyName', 'sponsored', 'message', 'service', 'status', 'dateExpire', 'action'];
  minDate:any= new Date(1990, 0, 1);
  constructor(private _ReminderService: ReminderService
    , private toaster: ToastrService
    , public dialog: MatDialog
  ) {
    this.getAllReminders()
  }

  ngOnInit(): void {
  }
  makeValidationMax(start:any){
    console.log("test",start);
    this.minDate=new Date(start);
  }
  getAllReminders(filter?: any) {

    this._ReminderService.getAllReminders(filter).subscribe({
      next: (res) => {
        console.log(res.result.rows);
        if (!filter&&res.result.rows.length>0) {
          this._ReminderService.IsReminder.next(true)
        } 
        if(!filter&&res.result.rows.length==0){
          this._ReminderService.IsReminder.next(false)
        }
        this._ReminderService.IsReminder.subscribe(()=>{
          console.log(this._ReminderService.IsReminder.getValue(),"test reminder exist");
        })
        this.dataSource = new MatTableDataSource<any>(res.result.rows);
        this.dataSource.paginator = this.paginator;
        this.toaster.success("success get Reminders", "success")
      } 
    })
     
  }

  addReminder() {
    const dialogRef = this.dialog.open(AddReminderComponent, {
      width: "60%",
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllReminders()
    });
  }
  filter: any = {}
  search(e: any, date: any, endDate: any, nameCompany: any) {
    console.log(nameCompany);
    
    if (date || endDate || nameCompany) {
      if (date) {
        this.filter.dateExpire = new Date(date.split('-').reverse().join('-')).toISOString()
      }
      if (endDate) {
        this.filter.endExpire = new Date(endDate.split('-').reverse().join('-')).toISOString()
      }
      if(nameCompany){
        this.filter.companyName=nameCompany ;
      }
      this.getAllReminders(this.filter)
    } else {
      this.toaster.info('please select search criteria', "Info")
    }


  }


  resetSearch() {
    this.start.nativeElement.value = null;
    this.end.nativeElement.value = null;
    this.name.nativeElement.value = null ;
    this.filter={}
    this.getAllReminders()

  }

  updateReminder(e: any, el: any) {
    const dialogRef = this.dialog.open(AddReminderComponent, {
      width: "60%",
      disableClose: true,
      data: el,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllReminders()
    });

  }

  deleteReminder(id: any) {
    const dialogRef = this.dialog.open(ComfirmationComponent, {
      width: '750px',
      disableClose: true,
      data: { message: "Are You Sure to Delete ? " }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'no') {
        this._ReminderService.deleteReminder(id).subscribe({
          next: () => {
            this.toaster.success("Reminder Deleted Succesfully", "Success")
            this.getAllReminders()
          }
        })
      } else {
        this.toaster.warning('Reminder not deleted', "Warning")
      }
    });
  }

}
