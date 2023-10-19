import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DepositHistoryComponent } from './components/deposit-history/deposit-history.component';


@NgModule({ 
  declarations: [
    AddCustomerComponent,
    ListCustomerComponent,
    DepositHistoryComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
  ]
})
export class CustomerModule { }
