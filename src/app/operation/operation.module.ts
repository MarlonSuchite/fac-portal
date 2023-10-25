import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationRoutingModule } from './operation-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { OrdersComponent } from './Components/orders/orders.component';
import { CreateOrderComponent } from './Components/create-order/create-order.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrdersComponent, CreateOrderComponent],
  imports: [
    CommonModule,
    OperationRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    SharedModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule
  ]
})
export class OperationModule {}
