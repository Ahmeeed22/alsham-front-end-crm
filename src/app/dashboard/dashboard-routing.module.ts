import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
const routes: Routes = [
  {
    path : '',
    redirectTo:'home',
    pathMatch : 'full'
  },
  {
    path : "home" ,
    component : HomeDashboardComponent
  },
  {
    path : 'transactions',
    loadChildren : ()=> import('./transactions/transactions.module').then(m => m.TransactionsModule)
  },
  {
    path : 'services',
    loadChildren : () => import('./service/service.module').then(m => m.ServiceModule)
  },
  {
    path : 'customers',
    loadChildren : () => import('./customer/customer.module').then(m => m.CustomerModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
