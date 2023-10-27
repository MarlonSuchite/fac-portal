import { Injectable } from '@angular/core';
import { User } from '../Interfaces/customers';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  customers: User[] = [
    { id: 1, name: 'Mary' },
    { id: 2, name: 'Shelley' },
    { id: 3, name: 'Igor' },
    { id: 5, name: 'Carlos' },
    { id: 6, name: 'jOSE' },
    { id: 7, name: 'Marlon' },
    { id: 8, name: 'Eduardo' },
    { id: 9, name: 'Joseline' },
    { id: 10, name: 'Mirna' },
    { id: 11, name: 'Meco' },
    { id: 12, name: 'Edi' },
    { id: 13, name: 'Paola' },
    { id: 14, name: 'Pedro' },
    { id: 15, name: 'Juan' },
    { id: 16, name: 'Sebastian' },
    { id: 17, name: 'Sandra' }
  ];

  products = [
    { id: 1, name: 'Caja', price: 12 },
    { id: 2, name: 'Tenis', price: 12 },
    { id: 3, name: 'Tabla', price: 12 },
    { id: 4, name: 'Escoba', price: 12 },
    { id: 5, name: 'Camisa', price: 12 }
  ];

  order = {
    orderId: 1,
    customerId: 17,
    products: [
      {
        producId: 1,
        stock: 2,
        price: 12
      }
    ],
    totalPrice: 24
  };

  orders = [
    {
      orderId: 1,
      customer: 'Pedro',
      products: ['Caja', 'Camisa'],
      totalPrice: 300
    },
    {
      orderId: 2,
      customer: 'Pedro',
      products: ['Caja', 'Camisa'],
      totalPrice: 300
    },
    {
      orderId: 3,
      customer: 'Pedro',
      products: ['Caja', 'Camisa'],
      totalPrice: 300
    },
    {
      orderId: 4,
      customer: 'Pedro',
      products: ['Caja', 'Camisa'],
      totalPrice: 300
    },
    {
      orderId: 5,
      customer: 'Pedro',
      products: ['Caja', 'Camisa'],
      totalPrice: 300
    },
    {
      orderId: 6,
      customer: 'Pedro',
      products: ['Caja', 'Camisa'],
      totalPrice: 300
    },
    {
      orderId: 7,
      customer: 'Pedro',
      products: ['Caja', 'Camisa'],
      totalPrice: 300
    },
    {
      orderId: 8,
      customer: 'Pedro',
      products: ['Caja', 'Camisa'],
      totalPrice: 300
    },
    {
      orderId: 9,
      customer: 'Pedro',
      products: ['Caja', 'Camisa'],
      totalPrice: 300
    },
    {
      orderId: 10,
      customer: 'Pedro',
      products: ['Caja', 'Camisa'],
      totalPrice: 300
    },
    {
      orderId: 11,
      customer: 'Pedro',
      products: ['Caja', 'Camisa'],
      totalPrice: 300
    },
    {
      orderId: 12,
      customer: 'Pedro',
      products: ['Caja', 'Camisa'],
      totalPrice: 300
    }
  ];

  getCustomers() {
    return this.customers;
  }

  getProducts() {
    return this.products;
  }

  //Pedidos

  addOrder(value: any) {
    return console.log(value);
  }

  getOrder(id: any) {
    return this.order;
  }

  updateOrder(value: any) {
    return console.log(value);
  }

  getOrders() {
    return this.orders;
  }
}
