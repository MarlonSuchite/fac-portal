import { AbstractControl, ValidatorFn } from '@angular/forms';

export class FormValidations {
  static correctPassword(control: AbstractControl) {
    const value = control.value;
    if (
      /^(?=.*[!@#$%^&*()_+\-=[\]{};':",.<>?])(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/.test(
        value
      )
    ) {
      return null;
    }
    return { correctPassword: true };
  }

  static passwordEquality(password: any): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value !== password) return { passwordEquality: true };
      return null;
    };
  }

  static Nit(control: AbstractControl) {
    const value = control.value;
    if (!/^[\d]{10}$/.test(value)) {
      return { Nit: true };
    }

    return null;
  }

  static Passport(control: AbstractControl) {
    const value = control.value;
    if (!/^[A-Z]{2}\d{6}[A-Z]$/.test(value)) {
      return { Passport: true };
    }
    return null;
  }
}
