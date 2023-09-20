import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../Interfaces/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input() user!: User;
  @Output() clickUserEmail = new EventEmitter<string>();

  clickUser(email: string) {
    this.clickUserEmail.emit(email);
  }
}
