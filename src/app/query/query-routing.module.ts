import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuditComponent } from './Components/audit/audit.component';
import { ReportComponent } from './Components/report/report.component';
import { portectorGuard } from '../shared/Guards/protector.guard';
import { guardianRoles } from '../shared/Guards/guardian-roles.guard';
import { ROLE_AUDIT, ROLE_REPORT } from '../utils/constants';

const routes: Routes = [
  {
    path: 'search',
    component: AuditComponent,
    canActivate: [portectorGuard, guardianRoles(ROLE_AUDIT)]
  },
  {
    path: 'report',
    component: ReportComponent,
    canActivate: [portectorGuard, guardianRoles(ROLE_REPORT)]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule {}
