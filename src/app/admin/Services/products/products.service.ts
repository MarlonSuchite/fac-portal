import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products = {
    content: [
      {
        productId: 1,
        code: 1,
        name: 'Cajas',
        time: '12',
        barcode: '12345',
        description: 'Este es un muy buen producto',
        company: 'San Martin',
        stock: 12,
        status: 1
      },
      {
        productId: 2,
        code: 2,
        name: 'Cajas',
        time: '12',
        barcode: '12345',
        description: 'Este es un muy buen producto',
        company: 'San Martin',
        stock: 12,
        status: 1
      },
      {
        productId: 3,
        code: 3,
        name: 'Cajas',
        time: '12',
        barcode: '12345',
        description: 'Este es un muy buen producto',
        company: 'San Martin',
        stock: 12,
        status: 1
      }
    ],
    size: 10,
    sort: '',
    totalElements: 100,
    totalPage: 2
  };

  product = {
    code: 1,
    name: 'Cajas',
    time: '12',
    barcode: '12345',
    description: 'Este es un muy buen producto',
    company: 'San Martin',
    stock: 12,
    status: 1
  };

  constructor() {
    //Constructor
  }

  //Agregar un producto
  addProduct(value: any) {
    return console.log(value);
  }

  //Obtener todos los productos
  getProducts(params: any) {
    const param = new HttpParams()
      .append('page', params.page - 1)
      .append('sort', params.sort)
      .append('size', params.size);
    return this.products;
  }

  //Obtener solo un producto
  getProduct(id: any) {
    const param = new HttpParams().append('id', id.id);
    return this.product;
  }

  //Modificar un producto
  updatedProduct(value: any) {
    const param = new HttpParams().append('id', value.productId);
    return console.log(param, value);
  }
}
