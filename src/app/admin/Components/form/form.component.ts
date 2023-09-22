import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MyErrorStateMatcher } from '../users/users.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() mode: 'add' | 'edit'
  @Output() addUser = new EventEmitter<any>();

  form!: FormGroup;
  matcher = new MyErrorStateMatcher();
  opciones: any = [
    {
      id: 1,
      name: 'QA - Proveedor'
    },
    {
      id: 2,
      name: 'PRF - Administrador General'
    },
    {
      id: 3,
      name: 'PRF - Proveedores'
    },
    {
      id: 4,
      name: 'Test Role'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      options: ['', Validators.required]
    });
  }

  addUserFunction() {
    const params = {
      email: this.form.get('email').value,
      name: this.form.get('name').value,
      option: this.form.get('options').value,
      status: true
    };
    this.addUser.emit(params);
    this.form.reset();
  }
}
