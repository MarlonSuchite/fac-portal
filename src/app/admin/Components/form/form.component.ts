import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../users/users.component';
import { UserApi } from '../../Interfaces/user-api';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {
  @Input() mode: 'add' | 'edit';
  @Input() user!: UserApi;
  @Output() userActions = new EventEmitter<any>();
  @Output() changeModeParent = new EventEmitter<any>();

  form!: FormGroup;
  matcher = new MyErrorStateMatcher();
  copyUser: UserApi[] = [];
  buttonStatus = false;

  options: any = [
    { id: 1, name: 'QA - Proveedor' },
    { id: 2, name: 'PRF - Administrador General' },
    { id: 3, name: 'PRF - Proveedores' },
    { id: 4, name: 'Test Role' }
  ];

  statusUser = this.user?.status;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.mode === 'edit') {
      this.form.setValue({
        email: this.user.email,
        name: this.user.name,
        options: this.user.profile.id
      });
      this.buttonStatus = true;
    } else {
      this.form.reset();
    }
    this.copyUser.push(this.user);
  }

  buildForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      options: ['', Validators.required]
    });
    this.changesObject();
  }

  action() {
    if (this.mode === 'add') {
      const params = {
        email: this.form.get('email').value,
        name: this.form.get('name').value,
        profileId: this.form.get('options').value,
        status: true
      };
      this.userActions.emit(params);
      this.form.reset();
    } else {
      const params = {
        id: this.user.id,
        email: this.form.get('email').value,
        name: this.form.get('name').value,
        profileId: this.form.get('options').value,
        status: true
      };
      this.userActions.emit(params);
      this.form.reset();
    }
  }

  changeMode() {
    this.changeModeParent.emit('add');
    this.buttonStatus = false;
  }

  status() {
    this.statusUser = !this.statusUser;
    const params = {
      id: this.user.id,
      email: this.form.get('email').value,
      name: this.form.get('name').value,
      profileId: this.form.get('options').value,
      status: this.statusUser
    };
    this.userActions.emit(params);
  }

  //Cambios en el objeto
  changesObject() {
    this.form.valueChanges.subscribe(res => {
      if (this.mode === 'edit') {
        this.copyUser.forEach(element => {
          if (
            element.email === res.email &&
            element.name === res.name &&
            element.profile.id === res.options
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
