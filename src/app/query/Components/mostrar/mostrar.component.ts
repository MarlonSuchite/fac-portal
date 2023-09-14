import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuditService } from '../../Services/audit.service';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent {
  constructor(
    private activateRoute: ActivatedRoute,
    private auditService: AuditService
  ) {
    this.activateRoute.paramMap.subscribe((parametros: ParamMap) => {
      console.log(parametros);
    });
  }
}
