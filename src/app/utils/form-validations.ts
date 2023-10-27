import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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
      console.log('entre');
      return { Passport: true };
    }
    return null;
  }

  //Solo letras
  static textOnly(control: AbstractControl) {
    const value = control.value;
    if (/[0-9!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(value)) {
      console.log('pase');
      return { textOnly: true };
    }
    return null;
  }

  //Solo números
  static numbersOnly(control: AbstractControl) {
    const value = control.value;
    if (/[a-zA-Z!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(value)) {
      return { numbersOnly: true };
    }
    return false;
  }

  //Fecha final mayor a fecha inicial
  static endDate(startDate: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value < startDate) {
        return { endDate: true };
      }
      return null;
    };
  }

  //Products
  static productSelected(productsSelected: number[]): ValidatorFn {
    return (control: AbstractControl) => {
      if (productsSelected.includes(control.value)) {
        return { productSelected: false };
      }
      return null;
    };
  }

  //Menor que 0
  static menorQue0(control: AbstractControl) {
    const value = control.value;
    if (value <= 0) {
      return { menorQue0: true };
    }
    return null;
  }
}
