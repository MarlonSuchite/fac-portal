import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any;
  form!: FormGroup;
  changePassword = false;

  constructor(
    private _userService: UserService,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.user = this._userService.getLoggedUser(1);
    this.form.setValue({
      name: this.user.name,
      email: this.user.email,
      profile: this.user.profile.name
    });
    this.form.disable();
  }

  buildForm() {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      profile: ['']
    });
  }

  clickChangePassword() {
    this.changePassword = true;
  }

  receiveChange(event: boolean) {
    this.changePassword = event;
  }
}
