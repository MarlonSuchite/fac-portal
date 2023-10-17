import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  datosFalsos = {
    content: [
      {
        id: 3131,
        startDate: '02/07/2021',
        endDate: '24/08/2025',
        order: '1',
        customer: 'Alejandro Galvez',
        amount: '1,345',
        taxes: '10',
        total: '1,355'
      },
      {
        id: 3132,
        startDate: '08/10/2020',
        endDate: '15/12/2023',
        order: '2',
        customer: 'Marcos Alcantara',
        amount: '1200',
        taxes: '15',
        total: '1215'
      },
      {
        id: 3133,
        startDate: '06/04/2022',
        endDate: '12/03/2026',
        order: '3',
        customer: 'Jefferson García',
        amount: '2500',
        taxes: '20',
        total: '2520'
      },
      {
        id: 3134,
        startDate: '11/07/2019',
        endDate: '03/09/2024',
        order: '4',
        customer: 'Paola Castellanos',
        amount: '1,500',
        taxes: '05',
        total: '1,505'
      },
      {
        id: 3135,
        startDate: '04/05/2020',
        endDate: '14/06/2023',
        order: '5',
        customer: 'Alexander Perez',
        amount: '1,100',
        taxes: '05',
        total: '1,105'
      },
      {
        id: 3136,
        startDate: '01/06/2018',
        endDate: '07/12/2026',
        order: '6',
        customer: 'María Recinos',
        amount: '1,155',
        taxes: '15',
        total: '1,170'
      },
      {
        id: 3137,
        startDate: '10/10/2021',
        endDate: '16/04/2027',
        order: '7',
        customer: 'Fabian Manzilla',
        amount: '1,378',
        taxes: '07',
        total: '1,385'
      },
      {
        id: 3138,
        startDate: '29/02/2016',
        endDate: '23/09/2023',
        order: '8',
        customer: 'Amanda Castillo',
        amount: '2,700',
        taxes: '20',
        total: '2,720'
      },
      {
        id: 3139,
        startDate: '19/09/2020',
        endDate: '25/11/2026',
        order: '9',
        customer: 'Francisco Portillo',
        amount: '2,225',
        taxes: '25',
        total: '2,250'
      },
      {
        id: 3140,
        startDate: '31/08/2018',
        endDate: '14/07/2024',
        order: '10',
        customer: 'Hilary De Leon',
        amount: '2,375',
        taxes: '25',
        total: '3,000'
      },
    ],
    page: 0,
    totalElements: 10,
    totalPages: 1
  };

  constructor(private http: HttpClient) {}

  getData() {
    return of(this.datosFalsos.content);
  }
}
