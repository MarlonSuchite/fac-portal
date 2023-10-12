import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/user/user.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { UserApi } from '../../../admin/Interfaces/user-api';
import { ContentApi } from '../../Interfaces/content';
import {
  PAGE,
  SIZE,
  SORT,
  PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  ROUTES_ADMIN_USERS
} from 'src/app/utils/constants';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  searchValue = new FormControl('');
  users: UserApi[] = [];
  totalElements = 0;
  page = PAGE;
  search = '';
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
    private router: Router,
    private activedRouter: ActivatedRoute,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.params();
    this.firstCall();
  }

  //Mandar parametros en blanco y hacer las asignacines
  firstCall() {
    this._userService.getUsers(this.param).subscribe((res: ContentApi) => {
      this.totalElements = res.totalElements;
      this.users = res.content;
    });
  }

  //Mandar parametros para paginacion
  params() {
    this.activedRouter.queryParams.subscribe(params => {
      if (params['page']) {
        this.page = params['page'];
        //this.search = params['search'];
        this._userService.getUsers(params).subscribe((res: any) => {
          this.users = res.content;
        });
      }
    });
  }

  //Obtener solo un usuario
  clickUser(valor: any): void {
    this.router.navigate([`${ROUTES_ADMIN_USERS}`], {
      queryParams: { id: valor }
    });
  }

  //Obtener el numero de pagina
  getPage(event: any): void {
    this.router.navigate([`${ROUTES_ADMIN_USERS}`], {
      queryParams: {
        page: event.pageIndex + 1,
        search: this.search,
        size: this.size,
        sort: this.sort
      }
    });
  }

  //Obtener el parametro de busqueda
  searchParams(): void {
    this.router.navigate([`${ROUTES_ADMIN_USERS}`], {
      queryParams: { page: 0, search: this.searchValue.value }
    });
  }
}
