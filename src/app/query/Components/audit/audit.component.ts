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
  datos: Peticiones[] = [];
  starDate = new FormControl('');
  endDate = new FormControl('');
  operacion: string;
  entidad: string;

  constructor(
    private router: Router,
    private auditService: AuditService,
    private activateRoute: ActivatedRoute
  ) {
    this.activateRoute.queryParams.subscribe(parametros => {
      console.log(parametros);
      this.llamaServicio();
    });
  }

  llamaServicio() {
    this.auditService.getPrueba().subscribe({
      next: res => {
        this.datos = res;
        console.log(this.datos);
      }
    });
  }

  buscarParametros() {
    const parametros = {
      start: formatDate(this.starDate.value, 'yyyy-MM-dd', 'en-US'),
      end: formatDate(this.endDate.value, 'yyyy-MM-dd', 'en-US'),
      operacion: this.operacion,
      entity: this.entidad,
      size: 10,
      page: 0
    };
    //Formatear fechas

    this.router.navigate(['audit/busqueda'], {
      queryParams: parametros
    });
  }
}
