import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  loginForm!: FormGroup;

  constructor(
    private _authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  logIn(): void {
    const params = {
      emai: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this._authService.login(params);
    this.router.navigate(['/admin/userProfile']);
  }
}
