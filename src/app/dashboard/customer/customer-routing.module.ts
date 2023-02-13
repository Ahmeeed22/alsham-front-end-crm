import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';

const routes: Routes = [
  {
    path : '' ,
    redirectTo :'List',
    pathMatch :'full'
  },
  {
    path : 'List', component : ListCustomerComponent ,
  },
  {
    path : 'Add', component : AddCustomerComponent ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
