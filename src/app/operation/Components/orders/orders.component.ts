import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../../Services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  data: any[];

  constructor(
    private router: Router,
    private _orderService: OrdersService
  ) {}

  ngOnInit(): void {
    this.data = this._orderService.getOrders();
  }

  addOrder() {
    this.router.navigate(['/operation/create']);
  }
}
