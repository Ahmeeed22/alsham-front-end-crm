import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { ListTransactionsComponent } from './components/list-transactions/list-transactions.component';

const routes: Routes = [
  {
    path : '' ,
    redirectTo :'List',
    pathMatch :'full'
  },
  {
    path : 'List', component : ListTransactionsComponent ,
  },
  {
    path : 'Add', component : AddTransactionComponent ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
