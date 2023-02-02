import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import { DdlSearchableComponent } from './ddl-searcheble/ddl-searchable/ddl-searchable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ 
    DdlSearchableComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ButtonModule,
    DdlSearchableComponent
  ]
})
export class SharedModule { }
