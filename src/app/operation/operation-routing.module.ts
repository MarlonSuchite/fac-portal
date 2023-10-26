import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './Components/orders/orders.component';
import { CreateOrderComponent } from './Components/create-order/create-order.component';
import { portectorGuard } from '../shared/Guards/protector.guard';
import { guardianRoles } from '../shared/Guards/guardian-roles.guard';
import { ROLE_ADD_ORDER, ROLE_ORDER } from '../utils/constants';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [portectorGuard, guardianRoles(ROLE_ORDER)]
  },
  {
    path: 'create',
    component: CreateOrderComponent,
    canActivate: [portectorGuard, guardianRoles(ROLE_ADD_ORDER)]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule {}
