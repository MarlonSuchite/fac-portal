import { Injectable } from '@angular/core';
import { ForgotPassword } from '../Interfaces/forgotPassword';
import { NewPassword } from '../Interfaces/new-password';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
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
