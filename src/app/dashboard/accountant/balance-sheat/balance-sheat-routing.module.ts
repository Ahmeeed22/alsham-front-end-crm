import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowBalanceSheatComponent } from './show-balance-sheat/show-balance-sheat.component';

const routes: Routes = [
  {
    path :"" ,component : ShowBalanceSheatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalanceSheatRoutingModule { }
