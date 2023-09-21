import { Component, OnInit } from '@angular/core';
import { User } from '../../Interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  user!: any;
 
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.activedRouter.queryParams.subscribe(params => {
      const email = params['email'];
      this.user = this._userService.getUser(email);
    });
    this.users = this._userService.getUsers();
  }

  clickUser(valor: string): void {
    this.router.navigate(['users'], { queryParams: { email: valor } });
  }

  pageSize = 7;
  pageSizeOptions = [7];

    //Agregar usuario
    addUser(value: any){
      this._userService.addNewUser(value)
    }
}


