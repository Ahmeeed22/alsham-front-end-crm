import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { ListServiceComponent } from './components/list-service/list-service.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddServiceComponent,
    ListServiceComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ServiceModule { }
