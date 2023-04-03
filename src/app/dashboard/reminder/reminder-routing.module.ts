import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddReminderComponent } from './components/add-reminder/add-reminder.component';
import { ListReminderComponent } from './components/list-reminder/list-reminder.component';

const routes: Routes = [
  {
    path : '' ,
    redirectTo :'List',
    pathMatch :'full'
  },
  {
    path : 'List', component : ListReminderComponent ,
  },
  {
    path : 'Add', component : AddReminderComponent ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReminderRoutingModule { }
