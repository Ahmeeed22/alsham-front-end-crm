import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { ListTransactionSupplierComponent } from './components/list-transaction-supplier/list-transaction-supplier.component';
import { AddSupplierTransactionComponent } from './components/add-supplier-transaction/add-supplier-transaction.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListTransactionSupplierComponent,
    AddSupplierTransactionComponent
  ],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SuppliersModule { }
