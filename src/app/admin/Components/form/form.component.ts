import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../users/users.component';
import { UserApi } from '../../Interfaces/user-api';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/Components/dialog/dialog.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output() addEvent = new EventEmitter<string>();

  mode: 'add' | 'edit';
  form!: FormGroup;
  matcher = new MyErrorStateMatcher();
  copyUser: UserApi[] = [];
  user: UserApi;
  buttonStatus = false;
  statusUser: boolean;

  options: any = [
    { id: 1, name: 'QA - Proveedor' },
    { id: 2, name: 'PRF - Administrador General' },
    { id: 3, name: 'PRF - Proveedores' },
    { id: 4, name: 'Test Role' }
  ];

  constructor(
    private fb: FormBuilder,
    private activRouter: ActivatedRoute,
    private _userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.mode = 'add';
    this.params();
  }

  params() {
    this.activRouter.queryParams.subscribe(params => {
      if (params['id']) {
        this.mode = 'edit';
        this._userService.getUser(params).subscribe({
          next: (res: UserApi) => {
            this.form.setValue({
              email: res.email,
              name: res.name,
              options: res.profileId
            });
            this.form.get('email').disable();
            this.user = res;
            this.copyUser.push(res);
            this.statusUser = res.status;
            this.buttonStatus = true;
          }
        });
      } else {
        this.form.reset();
      }
    });
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
      const params: UserApi = {
        email: this.form.get('email').value,
        name: this.form.get('name').value,
        profileId: this.form.get('options').value,
        status: true
      };
      this._userService
        .addNewUser(params)
        .subscribe(() => this.addEvent.emit('d'));
      this.form.reset();
    } else {
      const params: UserApi = {
        userId: this.user.userId,
        email: this.form.get('email').value,
        name: this.form.get('name').value,
        profileId: this.form.get('options').value,
        status: this.user.status
      };
      this._userService.updateUser(params).subscribe(() => this.params());
      this.form.reset();
    }
  }

  status() {
    this.statusUser = !this.statusUser;
    const params: UserApi = {
      userId: this.user.userId,
      email: this.form.get('email').value,
      name: this.form.get('name').value,
      profileId: this.form.get('options').value,
      status: this.statusUser
    };
    this._userService.updateUser(params).subscribe(() => this.params());
  }

  //Cambiar modo add
  changeMode() {
    this.mode = 'add';
    this.router.navigate(['/admin/users'], { queryParams: {} });
    this.buttonStatus = false;
    this.form.get('email').enable();
  }

  //Cambios en el objeto
  changesObject() {
    this.form.valueChanges.subscribe(res => {
      if (this.mode === 'edit') {
        this.copyUser.forEach(element => {
          if (
            element.email === res.email &&
            element.name === res.name &&
            element.profileId === res.options
          ) {
            this.buttonStatus = true;
          } else {
            this.buttonStatus = false;
          }
        });
      }
    });
  }

  //Abrir dialogo
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, { width: '300px' });
    dialogRef.afterClosed().subscribe({
      next: res => {
        if (res) {
          this.status();
        }
      }
    });
  }
}
