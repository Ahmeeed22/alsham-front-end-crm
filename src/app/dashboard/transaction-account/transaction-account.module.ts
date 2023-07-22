import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionAccountRoutingModule } from './transaction-account-routing.module';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    TransactionAccountRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    FormsModule
  ]
})
export class TransactionAccountModule { }
