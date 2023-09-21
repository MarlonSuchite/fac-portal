import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserApi } from '../../Interfaces/user-api';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input() user!: UserApi;
  @Output() clickUserEmail = new EventEmitter<string>();

  clickUser(email: string) {
    this.clickUserEmail.emit(email);
  }
}
