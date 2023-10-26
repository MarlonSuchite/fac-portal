import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../../Interfaces/customers';
import { OrdersService } from '../../Services/orders.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  myControl = new FormControl<string | User>('', [Validators.required]);
  products = new FormControl([], [Validators.required]);
  mode: 'add' | 'edit';
  client: User;
  productsSelect: any[];
  price = 0;
  totalPrice = new FormControl<number>(0);
  options: User[];
  productsApi: any[];
  filteredOptions: Observable<User[]>;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private _ordersService: OrdersService
  ) {}

  ngOnInit() {
    this.options = this._ordersService.getCustomers();
    this.productsApi = this._ordersService.getProducts();
    this.totalPrice.disable();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );

    //Cambios de ruta
    this.activatedRouter.queryParams.subscribe(params => {
      if (params['id']) {
        this.mode = 'edit';
        const parametros = this._ordersService.getOrder(1);
        this.products.setValue(parametros.products);
        this.productsSelect = parametros.products;
        this.price = parametros.totalPrice;
        this.totalPrice.setValue(parametros.totalPrice);
        if (parametros.customerId) {
          this.client = this.options.find(
            res => res.id === parametros.customerId
          );
          this.myControl.setValue(this.client);
        }
      } else {
        this.mode = 'add';
      }
    });
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  calcularPrecio(id: number) {
    if (this.productsSelect.includes(id)) {
      console.log('entre');
      //Si ya esta agregado restar
      const product = this.productsApi.find(res => res.id === id);
      if (product) {
        this.price = this.price - product.price;
        this.totalPrice.setValue(this.price);
      }

      //Sacar prodcuto del arreglo
      this.productsSelect = this.productsSelect.filter(res => res !== id);
    } else {
      //Si no esta agregado sumar
      const product = this.productsApi.find(res => res.id === id);
      if (product) {
        this.price = this.price + product.price;
        this.totalPrice.setValue(this.price);
      }

      this.productsSelect.push(id);
    }
  }

  addClient(cliente: User) {
    this.client = cliente;
  }

  action() {
    if (this.mode === 'add') {
      const params = {
        clientId: this.client.id,
        productsId: this.products.value,
        totalPrice: this.totalPrice.value
      };
      this._ordersService.addOrder(params);
      this.router.navigate(['/operation/orders']);
    } else {
      const params = {
        clientId: this.client.id,
        productsId: this.products.value,
        totalPrice: this.totalPrice.value
      };
      this._ordersService.updateOrder(params);
      this.router.navigate(['/operation/orders']);
    }
  }

  cancel() {
    this.router.navigate(['/operation/orders']);
  }
}
