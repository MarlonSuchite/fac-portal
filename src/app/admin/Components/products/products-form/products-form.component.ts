import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/Components/dialog/dialog.component';
import { ProductsApi } from 'src/app/admin/Interfaces/user-api';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {
  @Output() addEvent = new EventEmitter<string>();

  mode: 'add' | 'edit';
  form!: FormGroup;
  copyUser: ProductsApi[] = [];
  product: ProductsApi;
  buttonStatus = false;
  statusUser: boolean;

  options: any = [
    { id: 1, name: 'Activó' },
    { id: 2, name: 'Inactivo' }
  ];

  constructor(
    private fb: FormBuilder,
    private activRouter: ActivatedRoute,
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
    //Params
  }

  buildForm() {
    this.form = this.fb.group({
      name: [''],
      code: [''],
      codeBar: [''],
      sendDates: [''],
      description: [''],
      company: [''],
      avaibality: ['']
    });
  }

  action() {
    //Agregar Editar
  }

  status() {
    //Cambiar status producto
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
