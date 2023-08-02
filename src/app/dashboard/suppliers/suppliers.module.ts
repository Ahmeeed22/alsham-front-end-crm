import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { ListTransactionSupplierComponent } from './components/list-transaction-supplier/list-transaction-supplier.component';
import { AddSupplierTransactionComponent } from './components/add-supplier-transaction/add-supplier-transaction.component';


@NgModule({
  declarations: [
    ListTransactionSupplierComponent,
    AddSupplierTransactionComponent
  ],
  imports: [
    CommonModule,
    SuppliersRoutingModule
  ]
})
export class SuppliersModule { }
