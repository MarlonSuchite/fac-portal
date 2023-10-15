import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../Services/customers/customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PAGE,
  SIZE,
  SORT,
  PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  ROUTES_ADMIN_CUSTOMERS
} from 'src/app/utils/constants';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  searchValue = new FormControl('');
  customers: any[] = [];
  totalElements = 0;
  search = '';
  page = PAGE;
  sort = SORT;
  size = SIZE;
  pageSize = PAGE_SIZE;
  pageSizeOptions = PAGE_SIZE_OPTIONS;
  param = {
    page: this.page,
    size: this.size,
    sort: this.sort
  };

  constructor(
    private _customerService: CustomersService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.params();
    this.firstCall();
  }

  firstCall(): void {
    /* Realizar la suscripción */
    const parametros = this._customerService.getCustomers(this.param);
    this.totalElements = parametros.totalElements;
    this.customers = parametros.content;
  }

  params(): void {
    this.activatedRouter.queryParams.subscribe(params => {
      if (params['page']) {
        const parametros = this._customerService.getCustomers(params);
        this.customers = parametros.content;
      }
    });
  }

  clickCustomer(value: any): void {
    this.router.navigate([`${ROUTES_ADMIN_CUSTOMERS}`], {
      queryParams: { id: value }
    });
  }

  getPage(event: any): void {
    this.router.navigate([`${ROUTES_ADMIN_CUSTOMERS}`], {
      queryParams: {
        page: event.pageIndex + 1,
        search: this.search,
        size: this.size,
        sort: this.sort
      }
    });
  }

  searchParams(): void {
    this.router.navigate([`${ROUTES_ADMIN_CUSTOMERS}`], {
      queryParams: {
        page: 1,
        search: this.searchValue.value,
        size: this.size,
        sort: this.sort
      }
    });
    this.searchValue.setValue('');
  }
}
