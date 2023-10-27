import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import {
  PAGE,
  SIZE,
  SORT,
  PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  ROUTES_ADMIN_PRODUCTS
} from 'src/app/utils/constants';
import { ProductsService } from '../../Services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  searchValue = new FormControl('');
  products: any[] = [];
  page = PAGE;
  search = '';
  sort = SORT;
  size = SIZE;
  pageSize = PAGE_SIZE;
  pageSizeOptions = PAGE_SIZE_OPTIONS;
  totalElements = 0;
  param = {
    page: this.page,
    size: this.size,
    sort: this.sort
  };

  constructor(
    private _productsService: ProductsService,
    private router: Router,
    private activedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.params();
    this.firstCall();
  }

  firstCall() {
    /* Aca va la suscripcion */
    const parametros = this._productsService.getProducts(this.param);
    this.totalElements = parametros.totalElements;
    this.products = parametros.content;
    console.log(this.products);
  }

  params() {
    this.activedRouter.queryParams.subscribe(params => {
      if (params['page']) {
        const parametros = this._productsService.getProducts(params);
        this.products = parametros.content;
      }
    });
  }

  clickProduct(value: any): void {
    this.router.navigate([`${ROUTES_ADMIN_PRODUCTS}`], {
      queryParams: { id: value }
    });
  }

  getPage(event: any): void {
    this.router.navigate([`${ROUTES_ADMIN_PRODUCTS}`], {
      queryParams: {
        page: event.pageIndex + 1,
        search: this.search,
        size: this.size,
        sort: this.sort
      }
    });
  }

  searchParams(): void {
    this.router.navigate([`${ROUTES_ADMIN_PRODUCTS}`], {
      queryParams: {
        page: 1,
        search: this.searchValue.value,
        size: this.size,
        sort: this.sort
      }
    });
    this.searchValue.setValue(' ')
  }
}
