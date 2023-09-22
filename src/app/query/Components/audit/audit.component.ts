import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuditService } from '../../Services/audit.service';
import { Peticiones } from '../../interfaces/peticiones';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent {
  data: Peticiones[] = [];
  starDate = new FormControl('');
  endDate = new FormControl('');
  operation: string;
  entity: string;

  constructor(
    private router: Router,
    private auditService: AuditService,
    private activateRoute: ActivatedRoute
  ) {
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
      start: formatDate(this.starDate.value, 'yyyy-MM-dd', 'en-US'),
      end: formatDate(this.endDate.value, 'yyyy-MM-dd', 'en-US'),
      operation: this.operation,
      entity: this.entity
    };

    this.router.navigate(['query/search'], {
      queryParams: params
    });
  }
  clearParams() {
    this.data = [];
    this.starDate.setValue('');
    this.endDate.setValue('');
    this.operation = '';
    this.entity = '';
  }
}
