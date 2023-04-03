import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReminderRoutingModule } from './reminder-routing.module';
import { ListReminderComponent } from './components/list-reminder/list-reminder.component';
import { AddReminderComponent } from './components/add-reminder/add-reminder.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    ListReminderComponent,
    AddReminderComponent
  ],
  imports: [
    CommonModule,
    ReminderRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule
  ]
})
export class ReminderModule { }
