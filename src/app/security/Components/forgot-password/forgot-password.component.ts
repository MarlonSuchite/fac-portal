import { Component } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';
import { FormValidations } from 'src/app/utils/form-validations';
import { ForgotPassword } from '../../Interfaces/forgotPassword';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  form!: FormGroup;
  hideNewPassword = true;
  hideConfirmPassword = true;
  constructor(
    private _loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.buildForm();
  }

  //Formulario
  buildForm(): void {
    this.form = this.fb.group({
      email: [this.email.value],
      code: ['', Validators.required],
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

  //Setear al recibir cambios
  setValidator() {
    this.form
      .get('newPassword')
      .valueChanges.subscribe(res =>
        this.form.controls['confirmNewPassword'].setValidators([
          Validators.required,
          Validators.minLength(8),
          FormValidations.passwordEquality(res)
        ])
      );
  }

  //Enviar email
  sendEmail(): void {
    if (this.email) {
      this._loginService.forgotPasswordEmail(this.email.value);
      this.form.get('email').setValue(this.email.value);
      this.form.get('email')?.disable();
    }
  }

  //Enviar password
  sendPassword() {
    const password: ForgotPassword = {
      confirmationCode: this.form.get('code').value,
      password: this.form.get('newPassword').value,
      username: this.form.get('email').value
    };
    this._loginService.sendPassword(password);
  }

  //Regresar al login
  goBack() {
    this.router.navigate(['/security/login']);
  }
}
