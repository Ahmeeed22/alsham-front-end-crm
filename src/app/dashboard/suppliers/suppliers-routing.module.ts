import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTransactionSupplierComponent } from './components/list-transaction-supplier/list-transaction-supplier.component';
import { AddSupplierTransactionComponent } from './components/add-supplier-transaction/add-supplier-transaction.component';

const routes: Routes = [
  {
    path :'' , redirectTo:'List' , pathMatch:'full'
  }
  ,{
    path : 'List' , component : ListTransactionSupplierComponent
  }
  ,{
    path : 'Add' , component : AddSupplierTransactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
