import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTransactionComponent } from './components/list-transaction/list-transaction.component';
import { AddComponent } from '../transaction-account/components/add/add.component';

const routes: Routes = [
  {
    path : '' , redirectTo :"List" ,pathMatch:'full'
  },
  {
    path :'List' , component : ListTransactionComponent
  },
  {
    path :"Add" ,component : AddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanksRoutingModule { }
