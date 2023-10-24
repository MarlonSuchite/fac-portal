import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessComponent } from './process/process.component';
import { OperationRoutingModule } from './operation-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProcessComponent
  ],
  imports: [
    CommonModule,
    OperationRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    SharedModule
  ]
})
export class OperationModule { }
