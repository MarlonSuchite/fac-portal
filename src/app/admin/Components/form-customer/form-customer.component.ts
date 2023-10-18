import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../Services/customers/customers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/Services/alert/alert.service';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.scss']
})
export class FormCustomerComponent implements OnInit {
  form!: FormGroup;
  mode: 'add' | 'edit';
  customer: any;
  copyCustomer: any[] = [];
  buttonStatus = false;

  constructor(
    private _customerService: CustomersService,
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private alerta: AlertService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.mode = 'add';
    this.params();
  }

  params(): void {
    this.activatedRouter.queryParams.subscribe(params => {
      if (params['id']) {
        this.mode = 'edit';
        const parametros = this._customerService.getCustomer(params);
        this.customer = parametros;
        this.form.setValue({
          name: parametros.name,
          DPI: parametros.DPI,
          NIT: parametros.NIT,
          passport: parametros.passport,
          address: parametros.address
        });
        this.buttonStatus = true;
        this.copyCustomer.push(parametros);
      } else {
        this.form.reset();
      }
    });
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      DPI: ['', [Validators.minLength(13), Validators.maxLength(13)]],
      NIT: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      passport: [
        ''
        /*  [
           FormValidations.Passport,
           Validators.minLength(9)
         ] */
      ],
      address: ['', [Validators.required]]
    });
    this.changesObject();
  }

  action(): void {
    if (this.mode === 'add') {
      const customer = {
        name: this.form.get('name').value,
        DPI: this.form.get('DPI').value,
        NIT: this.form.get('NIT').value,
        passport: this.form.get('passport').value,
        address: this.form.get('address').value,
        status: 1
      };
      this._customerService.addCustomer(customer);
      this.form.reset();
      this.alerta.mostrarAlerta('success', '200 Agregado');
    } else {
      const customer = {
        customerId: this.customer.customerId,
        name: this.form.get('name').value,
        DPI: this.form.get('DPI').value,
        NIT: this.form.get('NIT').value,
        passport: this.form.get('passport').value,
        address: this.form.get('address').value,
        status: 1
      };
      /* Realizar la suscripcion */
      this._customerService.updateCustomer(customer);
      this.form.reset();
      this.mode = 'add';
    }
  }

  changeMode() {
    this.mode = 'add';
    this.router.navigate(['/admin/customers'], { queryParams: {} });
    this.buttonStatus = false;
  }

  changesObject() {
    this.form.valueChanges.subscribe(res => {
      if (this.mode === 'edit') {
        this.copyCustomer.forEach(element => {
          if (
            element.name === res.name &&
            element.DPI === res.DPI &&
            element.NIT === res.NIT &&
            element.passport === res.passport &&
            element.address === res.address
          ) {
            this.buttonStatus = true;
          } else {
            this.buttonStatus = false;
          }
        });
      }
    });
  }
}
