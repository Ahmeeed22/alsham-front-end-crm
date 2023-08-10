import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanksRoutingModule } from './banks-routing.module';
import { ListTransactionComponent } from './components/list-transaction/list-transaction.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListTransactionComponent,
    AddTransactionComponent
  ],
  imports: [
    CommonModule,
    BanksRoutingModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BanksModule { }
