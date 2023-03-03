import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../transactions/transactions.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {
  detailsProfite:any={}
  count:number=0;
  filteration:any
  detailsProfiteMonthly:any={}
  countMonthly:number= 0 ;
  amountCash:number= 0 ;

  constructor(
    private _TransactionsService:TransactionsService  
  ) { 
    var start = new Date();
    start.setUTCHours(0,0,0,0);
    var end = new Date();
    end.setUTCHours(23,59,59,999);

    this.filteration = {
      date:true ,
      startedDate :start.toISOString(),
      endDate : end.toISOString() ,
    }
  }

  ngOnInit(): void {
    this.getAllTransactions()
    this.getAllTransactionsMonthly()
  }

  getAllTransactions(){
    this.filteration.offset=this.filteration.offset > 0 ? this.filteration.offset - 1 : 0 
    this._TransactionsService.getAllTransactions(this.filteration).subscribe({
      next:(res)=>{
        this.count=res.result.count
        this.detailsProfite={...res.allProfite[0]}
      }
    })
  }

   startOfMonth(date:any)
  {
   return new Date(date.getFullYear(), date.getMonth(),1);
  }

  getAllTransactionsMonthly(){
    let dt = new Date(); 
    let start = this.startOfMonth(dt).toISOString();
    var end = new Date();
    end.setUTCHours(23,59,59,999);
    this.filteration = {
      date:true ,
      startedDate :start,
      endDate : end.toISOString() ,
    }
    this.filteration.offset=this.filteration.offset > 0 ? this.filteration.offset - 1 : 0 
    this._TransactionsService.getAllTransactions(this.filteration).subscribe({
      next:(res)=>{
        this.countMonthly=res.result.count
        this.detailsProfiteMonthly={...res.allProfite[0]}
        this.amountCash=this.detailsProfiteMonthly.paymentAmount - this.detailsProfiteMonthly.total_price_without_profite 
      }
    })
  }

}
