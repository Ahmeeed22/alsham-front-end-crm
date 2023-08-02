import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanksRoutingModule } from './banks-routing.module';
import { ListTransactionComponent } from './components/list-transaction/list-transaction.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';


@NgModule({
  declarations: [
    ListTransactionComponent,
    AddTransactionComponent
  ],
  imports: [
    CommonModule,
    BanksRoutingModule
  ]
})
export class BanksModule { }
