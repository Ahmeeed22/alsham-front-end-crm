import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : '',
    redirectTo:'balanceSheat',
    pathMatch : 'full'
  },
  // {
  //   path : "home" ,
  //   component : HomeDashboardComponent
  // },
  {
    path : 'balanceSheat',
    loadChildren : ()=> import('./balance-sheat/balance-sheat.module').then(m => m.BalanceSheatModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountantRoutingModule { }
