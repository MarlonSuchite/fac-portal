import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuditService } from '../../Services/audit/audit.service';
import { Peticiones } from '../../interfaces/peticiones';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {
  data: Peticiones[] = [];
  form!: FormGroup;

  buildForm() {
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      operation: ['', Validators.required],
      entity: ['', Validators.required],
      user: ['']
    });
  }
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auditService: AuditService,
    private activateRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      if (params?.['start']) {
        this.callService();
      }
    });
  }

  callService() {
    this.auditService.getData().subscribe({
      next: res => {
        this.data = res;
      }
    });
  }

  searchParams() {
    const params = {
      //Formatear fechas
      start: formatDate(
        this.form.get('startDate').value,
        'yyyy-MM-dd',
        'en-US'
      ),
      end: formatDate(this.form.get('endDate').value, 'yyyy-MM-dd', 'en-US'),
      operation: this.form.get('operation'),
      entity: this.form.get('entity'),
      user: this.form.get('user')
    };

    this.router.navigate(['query/search'], {
      queryParams: params
    });
  }

  clearParams() {
    this.data = [];
    this.form.reset();
    this.router.navigate(['query/search'], { queryParams: {} });
  }
}
