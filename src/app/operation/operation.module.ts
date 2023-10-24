import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrderComponent } from './create-order/create-order.component';
import { OperationRoutingModule } from './operation-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CreateOrderComponent],
  imports: [
    CommonModule,
    OperationRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    SharedModule
  ]
})
export class OperationModule {}
