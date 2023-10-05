import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: [''],
      confirmNewPassword: ['']
    });
  }

  sendEvent() {
    this.changePassword = false;
    this.clickButton.emit(this.changePassword);
  }
}
