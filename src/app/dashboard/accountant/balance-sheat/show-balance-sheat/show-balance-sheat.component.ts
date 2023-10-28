import { Component, OnInit } from '@angular/core';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BanksService } from 'src/app/dashboard/banks/banks.service';
import { OwnerService } from 'src/app/dashboard/owners/components/service/owner.service';
import { SppliersService } from 'src/app/dashboard/suppliers/sppliers.service';
import { TransactionsService } from 'src/app/dashboard/transactions/transactions.service';

@Component({
  selector: 'app-show-balance-sheat',
  templateUrl: './show-balance-sheat.component.html',
  styleUrls: ['./show-balance-sheat.component.scss']
})
export class ShowBalanceSheatComponent implements OnInit {
  banks:any=[] ;
  suppliers:any=[];
  sumDeposit:any=0 ;
  sumBalance:any=0 ;
  sumCommission:any=0 ;
  sumCapital:any=0 ;
  sumDrawing :any=0 ;
  totalProfie :any=0 ;
  assets :any=0 ;
  expenses :any=0 ;

  constructor(
    private _BanksService:BanksService ,
    private _SppliersService:SppliersService ,
    private _AuthService:AuthService ,
    private _OwnerService:OwnerService ,
    private _TransactionsService:TransactionsService
  ) {
    // this.getAllbanks() ;
    // this.getAllSuppliers() ;
    this.getSumDeposites() ;
    this.getSumBalance() ;
    this.getCapitalAndOwnerDrawing() ;
    this.calculateAssets();
    this.getExpensesSum()
   }

  ngOnInit(): void {
    console.log(this.assets);
    
  }


  getAllbanks() {
    return this._BanksService.getAllBanks().pipe(
      map((res) => {
        this.banks = res.result.rows;
        let sumBanksBalance = 0;

        for (let index = 0; index < this.banks.length; index++) {
          sumBanksBalance += this.banks[index].balance;
        }

        return sumBanksBalance;
      }),
      catchError((err) => {
        console.log(err);
        return of(0); // Return an observable with a default value
      })
    );
  }

  getAllSuppliers() {
    return this._SppliersService.getAllSuppliers().pipe(
      map((res) => {
        this.suppliers = res.result.rows;
        let sumBalanceSupplier = 0;

        for (let index = 0; index < this.suppliers.length; index++) {
          sumBalanceSupplier += this.suppliers[index].balance;
        }

        return sumBalanceSupplier;
      }),
      catchError((err) => {
        console.log(err);
        return of(0); // Return an observable with a default value
      })
    );
  }

  calculateAssets() {
    forkJoin([this.getAllbanks(), this.getAllSuppliers()]).subscribe(([banksBalance, suppliersBalance]) => {
      this.assets = banksBalance + suppliersBalance;
      console.log("assets = ",this.assets);
      
    });
  }

  getSumDeposites(){
    this._AuthService.getSumDeposit().subscribe({
      next : (res)=>{
        this.sumDeposit=res.result.sumDeposite ;
        console.log("sumDeposit = ",this.sumDeposit);
        
      }
    })
  }

  getSumBalance(){
    this._AuthService.getSumBalance().subscribe({
      next : (res)=>{
        this.sumBalance=res.result.sumBalanceCustomers ;
        this.sumCommission=res.result.sumCommission ;
        this.totalProfie=res.result.totalProfit
        console.log("sumBalance ,sumCommission , totalProfie = ",res );
        
      }
    })
  }

  getCapitalAndOwnerDrawing(){
    this._OwnerService.getCapitalAndOwnerDrawing().subscribe({
      next : (res)=>{
        this.sumDrawing=res.result.drowingSum ;
        this.sumCapital=res.result.investSum ;
        console.log(res);
        
      } ,
      error : (err)=>{
        console.log(err);
      }
    })
  }

  getExpensesSum(){
    this._TransactionsService.getExpensesSum().subscribe({
      next : (res)=>{
        console.log( 'expensesSum ',res.expensesSum);
        this.expenses=res.expensesSum
      },
      error :(err)=>{
        console.log(err);
        
      }
    })
  }
  // getAllbanks():number{
  //   let sumBanksBalance =0
  //   this._BanksService.getAllBanks().subscribe({
  //     next:(res)=>{
  //       this.banks=res.result.rows ;

  //       for (let index = 0; index < this.banks.length; index++) {
  //         sumBanksBalance += this.banks[index].balance
          
  //       }
  //       console.log(this.banks);
  //       return sumBanksBalance ;
  //     },
  //     error:(err)=>{
  //       console.log(err);
  //       return  0 ;
  //     }
  //   })
  // }
  

  // getAllSuppliers(){
  //   let sumBalanceSupplier = 0 ;
  //   this._SppliersService.getAllSuppliers().subscribe({
  //     next:(res)=>{
  //       this.suppliers=res.result.rows ;
  //       console.log(this.suppliers);
  //       for (let index = 0; index < this.suppliers.length; index++) {
  //         sumBalanceSupplier += this.suppliers[index].balance
  //       }
  //       return sumBalanceSupplier ;
  //     },
  //     error:(err)=>{
  //       console.log(err);
  //       return  0 ;
  //     }
  //   })
  // }
}
