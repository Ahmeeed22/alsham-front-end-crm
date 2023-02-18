import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import { DdlSearchableComponent } from './ddl-searcheble/ddl-searchable/ddl-searchable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ComfirmationComponent } from './comfirmation/comfirmation.component';

@NgModule({
  declarations: [ 
    DdlSearchableComponent ,
    ComfirmationComponent

  ],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  exports:[
    ButtonModule,
    DdlSearchableComponent,
    DropdownModule
  ]
})
export class SharedModule { }
