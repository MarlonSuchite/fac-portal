import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customers = {
    content: [
      {
        customerId: 1,
        name: 'Juan Pérez',
        DPI: '1234567890101',
        NIT: 'C123456789',
        passport: 'AB123456B',
        address: '123 Calle Principal, Ciudad',
        state: 'Activo'
      },
      {
        customerId: 2,
        name: 'María González',
        DPI: '9876543210101',
        NIT: 'C987654321',
        passport: 'CD987654A',
        address: '456 Calle Secundaria, Ciudad',
        state: 'Inactivo'
      }
    ],
    size: 10,
    sort: '',
    totalElements: 100,
    totalPage: 2
  };

  customer = {
    customerId: 3,
    name: 'María González',
    DPI: '9876543210101',
    NIT: 'C987654321',
    passport: 'CD987654A',
    address: '456 Calle Secundaria, Ciudad',
    state: 'Inactivo'
  };

  constructor(private http: HttpClient) {}

  //Agregar un cliente
  addCustomer(value: any) {
    return console.log(value);
  }

  //Todos los clientes
  getCustomers(params: any) {
    const param = new HttpParams()
      .append('page', params.page)
      .append('sort', params.sort)
      .append('size', params.size);
    return this.customers;
  }

  //Solo un cliente
  getCustomer(id: any) {
    const param = new HttpParams().append('id', id.id);
    return this.customer;
  }

  //Modificar un cliente
  updateCustomer(value: any) {
    const param = new HttpParams().append('id', value.customerId);
    return console.log(value);
  }
}
