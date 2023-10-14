import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuditComponent } from './Components/audit/audit.component';
import { ReportComponent } from './components/report/report.component';

const routes: Routes = [
  {
    path: 'search',
    component: AuditComponent
  },
  {
    path: 'report',
    component: ReportComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule {}
