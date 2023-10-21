import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalanceSheatRoutingModule } from './balance-sheat-routing.module';
import { ShowBalanceSheatComponent } from './show-balance-sheat/show-balance-sheat.component';


@NgModule({
  declarations: [
    ShowBalanceSheatComponent
  ],
  imports: [
    CommonModule,
    BalanceSheatRoutingModule
  ]
})
export class BalanceSheatModule { }
