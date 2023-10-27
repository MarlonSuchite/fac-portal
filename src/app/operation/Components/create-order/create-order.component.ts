import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormArray,
  FormBuilder,
  Form
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../Interfaces/customers';
import { OrdersService } from '../../Services/orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormValidations } from 'src/app/utils/form-validations';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  mode: 'add' | 'edit';
  productsSelectedId = [];
  client: User;
  price = 0;
  totalPrice = new FormControl(0);
  options: User[];
  productsApi = [];
  myControl = new FormControl<string | number>('', [Validators.required]);
  products = [];
  pA = [];

  form: FormGroup;
  formTable: FormGroup;
  dataSourceArray = new MatTableDataSource(this.products);
  displayedColumns: string[] = ['Producto', 'Cantidad', 'Precio', 'Accion'];
  booleano = false;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private _ordersService: OrdersService,
    private fb: FormBuilder
  ) {
    this.formTable = new FormGroup({
      products: new FormArray([])
    });
  }

  ngOnInit() {
    this.options = this._ordersService.getCustomers();
    this.productsApi = this._ordersService.getProducts();
    this.totalPrice.disable();

    //Cambios de ruta
    this.activatedRouter.queryParams.subscribe(params => {
      if (params['id']) {
        this.mode = 'edit';
        const parametros = this._ordersService.getOrder(1);
        this.products = parametros.products;
        this.myControl.setValue(parametros.customerId);
        this.price = parametros.totalPrice;
        this.totalPrice.setValue(parametros.totalPrice);
        this.modeEdit(parametros.products);
        // this.addSelectedProductId(parametros.products)
      } else {
        this.mode = 'add';
      }
    });
  }

  modeEdit(products: any[]) {
    products.forEach(product => {
      const productFormGroup = this.createControls();
      productFormGroup.get('productId').setValue(product.productId);
      productFormGroup.get('stock').setValue(product.stock);
      productFormGroup.get('price').setValue(product.price);

      (this.formTable.get('products') as FormArray).push(productFormGroup);
    });

    this.products = (this.formTable.get('products') as FormArray).controls;
    this.dataSourceArray = new MatTableDataSource(this.products);
  }

  addSelectedProductId(products: any[]) {
    products.forEach(product => {
      this.productsSelectedId.push(product.productId);
    });
  }

  get tableFormArray(): FormArray {
    return this.formTable.get('products') as FormArray;
  }

  addControl() {
    (this.formTable.get('products') as FormArray).push(this.createControls());
    this.products = (this.formTable.get('products') as FormArray).controls;
    this.dataSourceArray = new MatTableDataSource(this.products);
  }

  createControls() {
    return new FormGroup({
      productId: new FormControl('', [
        Validators.required,
        FormValidations.productSelected(this.productsSelectedId)
      ]),
      stock: new FormControl('', [
        Validators.required,
        FormValidations.menorQue0
      ]),
      price: new FormControl({ value: '', disabled: true })
    });
  }

  cancel() {
    this.router.navigate(['/operation/orders']);
  }

  repetir(event: any) {
    this.formTable.get('products').valueChanges.subscribe(res => {
      if (this.tableFormArray.valid) {
        this.productsSelectedId.push(event);
      }
    });
  }

  cantidad(value: any, index: any) {
    //Valor del stock
    const stockValue = this.tableFormArray.at(index).get('stock').value;

    //Valor del precio del producto
    const { price } = this.productsApi[index];
    const price_ = price * stockValue;

    this.tableFormArray.at(index).get('price').setValue(price_);
    this.cambiosArray();
  }

  cambiosArray() {
    let precioTotal = 0;

    // Recorre los controles de productos en el FormArray
    this.tableFormArray.controls.forEach(control => {
      const precio = control.get('price').value;
      if (precio) {
        precioTotal += precio;
      }
    });

    // Actualiza el valor del FormControl totalPrice
    this.totalPrice.setValue(precioTotal);
  }

  delete(index) {
    const id = this.tableFormArray.at(index).get('productId').value;
    this.tableFormArray.removeAt(index);
    this.dataSourceArray.data = this.tableFormArray.controls;
    this.cambiosArray();
    this.productsSelectedId = this.productsSelectedId.filter(res => res !== id);
  }

  action() {
    if (this.mode === 'add') {
      //Habilitar el campo de precio para poder tomar su valor
      this.habilitar();

      const params = {
        clientId: this.myControl.value,
        products: this.tableFormArray.value,
        totalPrice: this.totalPrice.value
      };
      this._ordersService.addOrder(params);
      this.router.navigate(['/operation/orders']);
    } else {
      const params = {
        clientId: this.myControl.value,
        products: this.tableFormArray.value,
        totalPrice: this.totalPrice.value
      };
      this._ordersService.updateOrder(params);
      this.router.navigate(['/operation/orders']);
    }
  }

  habilitar() {
    this.tableFormArray.controls.forEach(control => {
      control.get('price').enable();
    });
  }

  desabilitar() {
    this.tableFormArray.controls.forEach(control => {
      control.get('price').disable();
    });
  }
}
