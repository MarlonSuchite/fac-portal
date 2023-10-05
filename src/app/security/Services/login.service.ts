import { Injectable } from '@angular/core';
import { ForgotPassword } from '../Interfaces/forgotPassword';

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
}
