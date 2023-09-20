import { Component, OnInit } from '@angular/core';
import { User } from '../../Interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  user!: any;

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
}
