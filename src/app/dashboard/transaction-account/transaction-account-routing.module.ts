import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';

const routes: Routes = [
  {
    path : "",
    redirectTo : "List",
    pathMatch : 'full'
  },
  {
    path : "List",
    component : ListComponent
  },
  {
    path : "Add",
    component : AddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionAccountRoutingModule { }
