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

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.activedRouter.queryParams.subscribe(params => {
      const email = params['email'];
      this.user = this._userService.getUser(email);
      console.log(this.user);
    });
    this.users = this._userService.getUsers();
  }

  clickUser(valor: string): void {
    this.router.navigate(['/admin/users'], { queryParams: { email: valor } });
    this.changeModeEdit();
  }

  //Agregar usuario
  receiveAction(value: any) {
    if (this.mode === 'add') {
      this._userService.addNewUser(value);
    } else {
      this._userService.updateUser(value);
    }
  }

  changeModeAdd(value: any) {
    this.mode = value;
  }

  changeModeEdit() {
    this.mode = 'edit';
  }

  pageSize = 7;
  pageSizeOptions = [7];
}
