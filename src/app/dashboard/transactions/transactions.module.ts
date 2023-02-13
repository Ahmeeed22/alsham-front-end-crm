import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { ListTransactionsComponent } from './components/list-transactions/list-transactions.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { ComfirmationComponent } from './components/comfirmation/comfirmation.component';


@NgModule({
  declarations: [
    ListTransactionsComponent,
    AddTransactionComponent,
    ComfirmationComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
