import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomersService } from '../customer/customers.service';
import { TransactionsService } from '../transactions/transactions.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit , OnDestroy{
  pettyCash=0;
  detailsProfite:any={}
  count:number=0;
  filteration:any
  detailsProfiteMonthly:any={}
  countMonthly:number= 0 ;
  amountCash:number= 0 ;
  dateToday=new Date() ;
  dailySummary:any ;
  monthlySummary:any ;
  constructor(
    private _TransactionsService:TransactionsService  ,
    private _CustomersService:CustomersService
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
    this.getPettyCash();
    this.getAllTransactions();
    // this.getMonthlySummary()
  }

  getAllTransactions(){
    this.filteration.offset=this.filteration.offset > 0 ? this.filteration.offset - 1 : 0 
    // this._TransactionsService.getAllTransactions(this.filteration).subscribe({
    //   next:(res)=>{
    //     this.count=res.result.count
    //     this.detailsProfite={...res.allProfite[0]} ;
    //     console.log(res);
        
    //   }
    // })

    this._TransactionsService.getSummary(this.filteration).subscribe({
      next :res=>{
        console.log("daily",res);
        this.dailySummary=res
      },
      error :err=>{
        console.log(err);
        
      }
    })
  }

   startOfMonth(date:any)
  {
   return new Date(date.getFullYear(), date.getMonth(),1);
  }
  getAllTransactionsMonthly(){
    let dt = new Date(); 
    // let start = this.startOfMonth(dt).toISOString();
    let start = new Date(2019,10,10); 
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
        this.amountCash=+this.detailsProfiteMonthly.paymentAmount +this.pettyCash - (+this.detailsProfiteMonthly.total_price_without_profite )
      }
    })
    this._TransactionsService.getSummary(this.filteration).subscribe({
      next :res=>{
        console.log("monthly",res);
        this.monthlySummary=res
      },
      error :err=>{
        console.log(err);
        
      }
    })
  }
  getPettyCash(){
    this._CustomersService.getAllCustomersSearch({name:'petty Cash'}).subscribe({
      next : (res)=>{
        // console.log(res);
        this.pettyCash=res.result[0]?.transactions[0]?.paymentAmount ||0 ;
        this.getAllTransactionsMonthly();
      }
    })
  }

  
  // getMonthlySummary(){
  //   let dt = new Date(); 
  //   let start = this.startOfMonth(dt).toISOString();
  //   var end = new Date();
  //   end.setUTCHours(23,59,59,999);
  //   this.filteration = {
  //     date:true ,
  //     startedDate :start,
  //     endDate : end.toISOString() ,
  //   }
  //   this.filteration.offset=this.filteration.offset > 0 ? this.filteration.offset - 1 : 0  ;
  //   this._TransactionsService.getSummary(this.filteration).subscribe({
  //     next :res=>{
  //       console.log(res);
  //     },
  //     error :err=>{
  //       console.log(err);
        
  //     }
  //   })

  // }

  ngOnDestroy(): void {
   
  }

}
