import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/Components/dialog/dialog.component';
import { UserService } from 'src/app/admin/Services/user/user.service';
import { ProductsApi, UserApi } from 'src/app/admin/Interfaces/user-api';
import { MyErrorStateMatcher } from '../products.component';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})

export class ProductsFormComponent implements OnInit {
  @Output() addEvent = new EventEmitter<string>();

  mode: 'add' | 'edit';
  form!: FormGroup;
  matcher = new MyErrorStateMatcher();
  copyUser: ProductsApi[] = [];
  product: ProductsApi;
  buttonStatus = false;
  statusUser: boolean;

  options: any = [
    { id: 1, name: 'Activó' },
    { id: 2, name: 'Inactivo' },
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
          next: (res: any) => {
            this.form.setValue({
              code: res.code,
              name: res.name,
              options: res.productId,
              sendDates: res.sendDates,
              codeBar: res.codeBar,
              description: res.description,
              company: res.company,
              avaibality: res.avaibality,
              status: res.status,
            });
            this.form.get('email').disable();
            this.product = res;
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
      code: ['', [Validators.required]],
      name: ['', Validators.required],
      sendDates: ['', Validators.required],
      codeBar: ['', Validators.required],
      description: ['', Validators.required],
      company: ['', Validators.required],
      avaibality: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.changesObject();
  }

  action() {
    if (this.mode === 'add') {
      const params: ProductsApi = {
        code: this.form.get('code').value,
        name: this.form.get('name').value,
        sendDates: this.form.get('sendDates').value,
        codeBar: this.form.get('codeBar').value,
        description: this.form.get('description').value,
        company: this.form.get('company').value,
        avaibality: this.form.get('avaibality').value,
        status: this.form.get('status').value,
      };
      //this._userService
       //.addNewUser(params)
        //.subscribe(() => this.addEvent.emit('d'));
      this.form.reset();
    } else {
      const params: ProductsApi = {
        productId: this.product.productId,
        code: this.form.get('code').value,
        name: this.form.get('name').value,
        sendDates: this.form.get('sendDates').value,
        codeBar: this.form.get('codeBar').value,
        description: this.form.get('description').value,
        company: this.form.get('company').value,
        avaibality: this.form.get('avaibality').value,
        status: this.form.get('status').value,
      };
      //this._userService.updateUser(params).subscribe(() => this.params());
      this.form.reset();
    }
  }

  status() {
    this.statusUser = !this.statusUser;
    const params: ProductsApi = {
      productId: this.product.productId,
      code: this.form.get('code').value,
      name: this.form.get('name').value,
      sendDates: this.form.get('sendDates').value,
      codeBar: this.form.get('codeBar').value,
      description: this.form.get('description').value,
      company: this.form.get('company').value,
      avaibality: this.form.get('avaibality').value,
      status: this.form.get('status').value,
    };
    //this._userService.updateUser(params).subscribe(() => this.params());
  }

  //Cambiar modo add
  changeMode() {
    this.mode = 'add';
    this.router.navigate(['/admin/products'], { queryParams: {} });
    this.buttonStatus = false;
    this.form.get('code').enable();
  }

  //Cambios en el objeto
  changesObject() {
    this.form.valueChanges.subscribe(res => {
      if (this.mode === 'edit') {
        this.copyUser.forEach(element => {
          if (
            element.code === res.code &&
            element.name === res.name &&
            element.productId === res.options
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

