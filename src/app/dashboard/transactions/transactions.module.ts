import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { ListTransactionsComponent } from './components/list-transactions/list-transactions.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './components/details/details.component';


@NgModule({
  declarations: [
    ListTransactionsComponent,
    AddTransactionComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TransactionsModule { }
