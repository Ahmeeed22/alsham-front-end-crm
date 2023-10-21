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
  },
  {
    path : 'reminders',
    loadChildren : () => import('./reminder/reminder.module').then(m => m.ReminderModule)
  },
  {
    path : 'transactionAccount',
    loadChildren : () => import('./transaction-account/transaction-account.module').then(m=>m.TransactionAccountModule)
  },
  {
    path :'banks',
    loadChildren : () => import('./banks/banks.module').then(m=>m.BanksModule)
  },
  {
    path :'sppliers',
    loadChildren : () => import('./suppliers/suppliers.module').then(m=>m.SuppliersModule)
  },
  {
    path : 'owners',
    loadChildren : () => import('./owners/owners.module').then(m=>m.OwnersModule)
  },
  {
    path : 'accountant',
    loadChildren : () => import('./accountant/accountant.module').then(m=>m.AccountantModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
