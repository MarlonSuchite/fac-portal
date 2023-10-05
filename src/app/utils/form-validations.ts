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
}
