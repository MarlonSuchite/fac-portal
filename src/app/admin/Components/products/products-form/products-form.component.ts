import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/Components/dialog/dialog.component';
import { ProductsService } from 'src/app/admin/Services/products/products.service';
import { AlertService } from 'src/app/shared/Services/alert/alert.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {
  @Output() addEvent = new EventEmitter<string>();

  mode: 'add' | 'edit';
  form!: FormGroup;
  product;
  copyProducts: any[] = [];
  buttonStatus = false;

  options: any = [
    { id: 1, name: 'Activó' },
    { id: 2, name: 'Inactivo' }
  ];

  constructor(
    private _productService: ProductsService,
    private activatedRouter: ActivatedRoute,
    private _alertService: AlertService,
    private fb: FormBuilder,
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
    this.activatedRouter.queryParams.subscribe(params => {
      if (params['id']) {
        this.mode = 'edit';
        const parametros = this._productService.getProduct(params);
        this.form.setValue({
          name: parametros.name,
          code: parametros.code,
          codeBar: parametros.codeBar,
          sendDates: parametros.time,
          description: parametros.description,
          company: parametros.company,
          avaibality: parametros.stock
        });
        this.buttonStatus = true;
        this.product = parametros;
        this.copyProducts.push(parametros);
      } else {
        this.form.reset();
      }
    });
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
    this.changesObject();
  }

  action() {
    if (this.mode === 'add') {
      const product = {
        name: this.form.get('name').value,
        code: this.form.get('code').value,
        codeBar: this.form.get('codeBar').value,
        sendDates: this.form.get('sendDates').value,
        description: this.form.get('description').value,
        company: this.form.get('company').value,
        avaibality: this.form.get('avaibality').value
      };
      this._productService.addProduct(product);
      this.form.reset();
      this._alertService.mostrarAlerta('success', '200 producto agregado');
    } else {
      const product = {
        productId: this.product.productId,
        name: this.form.get('name').value,
        code: this.form.get('code').value,
        codeBar: this.form.get('codeBar').value,
        sendDates: this.form.get('sendDates').value,
        description: this.form.get('description').value,
        company: this.form.get('company').value,
        avaibality: this.form.get('avaibality').value
      };
      this._productService.updatedProduct(product);
      this._alertService.mostrarAlerta('success', '200 Producto editado');
    }
  }

  status() {
    //Cambiar status producto
  }

  //Cambiar modo add
  changeMode() {
    this.mode = 'add';
    this.router.navigate(['/admin/products'], { queryParams: {} });
    this.buttonStatus = false;
  }

  //Cambios en el objeto
  changesObject() {
    this.form.valueChanges.subscribe(res => {
      if (this.mode === 'edit') {
        this.copyProducts.forEach(element => {
          console.log(element.codeBar, res.codeBar);
          if (
            element.code === res.code &&
            element.name === res.name &&
            element.codeBar === res.codeBar &&
            element.time === res.sendDates &&
            element.description === res.description &&
            element.company === res.company &&
            element.stock === res.avaibality
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
