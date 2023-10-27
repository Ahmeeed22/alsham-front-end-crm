import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BanksService } from 'src/app/dashboard/banks/banks.service';
import { OwnerService } from 'src/app/dashboard/owners/components/service/owner.service';
import { SppliersService } from 'src/app/dashboard/suppliers/sppliers.service';

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

  constructor(
    private _BanksService:BanksService ,
    private _SppliersService:SppliersService ,
    private _AuthService:AuthService ,
    private _OwnerService:OwnerService ,
  ) {
    this.getAllbanks() ;
    this.getAllSuppliers() ;
    this.getSumDeposites() ;
    this.getSumBalance() ;
    this.getCapitalAndOwnerDrawing() ;
   }

  ngOnInit(): void {
  }

  getAllbanks(){
    this._BanksService.getAllBanks().subscribe({
      next:(res)=>{
        this.banks=res.result.rows ;
        console.log(this.banks);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getAllSuppliers(){
    this._SppliersService.getAllSuppliers().subscribe({
      next:(res)=>{
        this.suppliers=res.result.rows ;
        console.log(this.suppliers);
        
      },
      error:(err)=>{
        console.log(err);
      }
    })
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
        console.log("sumBalanceCustomers = ",res);
        
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

}
