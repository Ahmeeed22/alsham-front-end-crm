import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOwnerComponent } from './components/list-owner/list-owner.component';
import { AddOwnerComponent } from './components/add-owner/add-owner.component';

const routes: Routes = [
  {
    path : '' , redirectTo :"List" ,pathMatch:'full'
  },
  {
    path :'List' , component : ListOwnerComponent
  },
  {
    path :"Add" ,component : AddOwnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnersRoutingModule { }
