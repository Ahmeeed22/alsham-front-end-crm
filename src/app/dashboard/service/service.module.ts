import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { ListServiceComponent } from './components/list-service/list-service.component';


@NgModule({
  declarations: [
    AddServiceComponent,
    ListServiceComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule
  ]
})
export class ServiceModule { }
