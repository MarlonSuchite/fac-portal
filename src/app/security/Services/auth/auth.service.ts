import { Injectable } from '@angular/core';
import { ForgotPassword } from '../../Interfaces/forgotPassword';
import { NewPassword } from '../../Interfaces/new-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
    // Constructor
  }

  token = {
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzY29wZSI6WyJvcGVuaWQiXSwidXNlcl9uYW1lIjoicm9vdEBpczR0A',
    expiration: 1695319262343,
    authorities: ['ROLE_USER', 'ROLE_PROFILE', 'ROLE_AUDIT']
  };

  login(value: any) {
    console.log(this.token.token);
    localStorage.setItem('token', this.token.token);
    localStorage.setItem('roles', JSON.stringify(this.token.authorities));
    return console.log(value);
  }

  logout() {
    localStorage.removeItem('token');
  }

  forgotPasswordEmail(value: string) {
    return console.log(value);
  }

  sendPassword(value: ForgotPassword) {
    return console.log(value);
  }

  sendNewPassword(value: NewPassword) {
    return console.log(value);
  }
}
