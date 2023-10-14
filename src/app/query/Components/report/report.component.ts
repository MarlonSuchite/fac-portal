import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuditService } from '../../Services/audit.service';
import { Peticiones } from '../../interfaces/peticiones';
import { formatDate } from '@angular/common';
import { ReportService } from '../../Services/report/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  data: Peticiones[] = [];
  form!: FormGroup;

  buildForm() {
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      order: ['', Validators.required],
      customer: ['', Validators.required],
      amount: ['', Validators.required],
      taxes: ['', Validators.required],
      total: ['', Validators.required],
    });
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auditService: ReportService,
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
      start: formatDate(this.form.get('starDate').value, 'yyyy-MM-dd', 'en-US'),
      end: formatDate(this.form.get('endDate').value, 'yyyy-MM-dd', 'en-US'),
      order: this.form.get('order').value,
      customer: this.form.get('customer').value,
      amount: this.form.get('amount').value,
      taxes: this.form.get('taxes').value,
      total: this.form.get('total').value,
    };

    this.router.navigate(['query/report'], {
      queryParams: params
    });
  }

  clearParams() {
    this.data = [];
    this.form.reset();
  }
}
