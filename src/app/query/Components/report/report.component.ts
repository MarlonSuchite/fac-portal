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
  data = []
  form!: FormGroup;

  buildForm() {
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      user: ['', Validators.required],
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
      start: formatDate(this.form.get('startDate').value, 'yyyy-MM-dd', 'en-US'),
      user: this.form.get('user').value,
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
