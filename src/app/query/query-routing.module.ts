import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuditComponent } from './Components/audit/audit.component';

const routes: Routes = [
  {
    path: 'busqueda',
    component: AuditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule {}
