import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { UserApi } from '../../../admin/Interfaces/user-api';

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
  users: UserApi[] = [];
  user!: any;
  mode: any = 'add';
  page = 0;
  search = '';
  searchValue = new FormControl('');

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.activedRouter.queryParams.subscribe(params => {
      if (params['id']) {
        const id = params['id'];
        this.user = this._userService.getUser(id);
        console.log(this.user);
      }

      if (params['page']) {
        (this.page = params['page']), (this.search = params['search']);
        /* 
          Servicio...
        */
      }
    });
    this.users = this._userService.getUsers();
  }

  //Obtener solo un usuario
  clickUser(valor: any): void {
    this.router.navigate(['/admin/users'], { queryParams: { id: valor } });
    this.changeModeEdit();
  }

  //Obtener el numero de pagina
  getPage(event: any) {
    this.router.navigate(['/admin/users'], {
      queryParams: { page: event.pageIndex, search: this.search }
    });
  }

  //Obtener el parametro de busqueda
  searchParams() {
    this.router.navigate(['/admin/users'], {
      queryParams: { page: 0, search: this.searchValue.value }
    });
  }

  //Agregar usuario o editar
  receiveAction(value: any) {
    if (this.mode === 'add') {
      this._userService.addNewUser(value);
    } else {
      this._userService.updateUser(value);
    }
  }

  //Cambiar a modo agregar
  changeModeAdd(value: any) {
    this.mode = value;
  }

  //Modo editar
  changeModeEdit() {
    this.mode = 'edit';
  }

  pageSize = 7;
  pageSizeOptions = [7];
}
