import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidations } from 'src/app/utils/form-validations';
import { NewPassword } from '../../Interfaces/new-password';
import { AuthService } from '../../Services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  @Input() changePassword!: boolean;
  @Output() clickButton = new EventEmitter<boolean>();

  currentPassword = true;
  newPassword = true;
  confirmNewPassword = true;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService
  ) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          FormValidations.correctPassword
        ]
      ],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.setValidator();
  }

  setValidator() {
    this.form.get('newPassword').valueChanges.subscribe(res => {
      this.form.controls['confirmNewPassword'].setValidators([
        Validators.required,
        Validators.minLength(8),
        FormValidations.passwordEquality(res)
      ]);
    });
  }

  sendNewPassword() {
    const password: NewPassword = {
      currentPassword: this.form.get('currentPassword').value,
      password: this.form.get('newPassword').value,
      passwordCondirmation: this.form.get('confirmNewPassword').value
    };
    this._authService.sendNewPassword(password);
  }

  sendEvent() {
    this.changePassword = false;
    this.clickButton.emit(this.changePassword);
  }
}
