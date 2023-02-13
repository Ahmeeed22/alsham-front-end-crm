import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { ListServiceComponent } from './components/list-service/list-service.component';

const routes: Routes = [
  {
    path : '' ,
    redirectTo :'List',
    pathMatch :'full'
  },
  {
    path : 'List', component : ListServiceComponent ,
  },
  {
    path : 'Add', component : AddServiceComponent ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
