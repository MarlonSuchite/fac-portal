import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/user/user.service';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { UserApi } from '../../../admin/Interfaces/user-api';
import { ContentApi } from '../../Interfaces/content';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  searchValue = new FormControl('');
  page = 1;
  search = '';
  sort = '';
  size = 10;
  pageSize = 10;
  pageSizeOptions = [10];
  totalElements = 0;
  param = {
    page: this.page,
    size: this.size,
    sort: this.sort
  };

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.params();
    this.firstCall();
  }

  firstCall() {
    //Primera llamada
  }

  params() {
    //Parametros
  }

  clickProduct(valor: any): void {
    //Al hacer click sobre un producto
  }

  getPage(event: any): void {
    //Paginacion
  }

  searchParams(): void {
    //Buscar un parametro
  }
}
