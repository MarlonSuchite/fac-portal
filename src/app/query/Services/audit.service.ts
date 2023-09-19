import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  datosFalsos = {
    content: [
      {
        identifier: '133',
        date: '2022-10-25T16:31:35Z',
        entity: 'costs',
        user: 'avasquez@is4tech.com',
        operation: 'I',
        id: 3130
      },
      {
        identifier: '132',
        date: '2022-10-20T18:06:07Z',
        entity: 'costs',
        user: 'aisabelv77@gmail.com',
        operation: 'I',
        id: 3002
      },
      {
        identifier: '131',
        date: '2022-10-20T16:56:48Z',
        entity: 'costs',
        user: 'aisabelv77@gmail.com',
        operation: 'I',
        id: 2928
      },
      {
        identifier: '130',
        date: '2022-10-18T17:43:00Z',
        entity: 'costs',
        user: 'ecoronado@is4tech.com',
        operation: 'I',
        id: 2597
      },
      {
        identifier: '128',
        date: '2022-10-18T17:42:39Z',
        entity: 'costs',
        user: 'ecoronado@is4tech.com',
        operation: 'I',
        id: 2595
      },
      {
        identifier: '127',
        date: '2022-10-18T17:42:28Z',
        entity: 'costs',
        user: 'ecoronado@is4tech.com',
        operation: 'I',
        id: 2594
      },
      {
        identifier: '126',
        date: '2022-10-18T17:42:18Z',
        entity: 'costs',
        user: 'ecoronado@is4tech.com',
        operation: 'I',
        id: 2592
      },
      {
        identifier: '125',
        date: '2022-10-18T17:42:10Z',
        entity: 'costs',
        user: 'ecoronado@is4tech.com',
        operation: 'I',
        id: 2591
      },
      {
        identifier: '124',
        date: '2022-10-18T17:42:01Z',
        entity: 'costs',
        user: 'ecoronado@is4tech.com',
        operation: 'I',
        id: 2590
      },
      {
        identifier: '123',
        date: '2022-10-18T17:39:36Z',
        entity: 'costs',
        user: 'ecoronado@is4tech.com',
        operation: 'I',
        id: 2589
      }
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
