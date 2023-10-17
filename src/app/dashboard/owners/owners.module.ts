import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnersRoutingModule } from './owners-routing.module';
import { AddOwnerComponent } from './components/add-owner/add-owner.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListOwnerComponent } from './components/list-owner/list-owner.component';


@NgModule({
  declarations: [
    ListOwnerComponent,
    AddOwnerComponent
  ],
  imports: [
    CommonModule,
    OwnersRoutingModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class OwnersModule { }
