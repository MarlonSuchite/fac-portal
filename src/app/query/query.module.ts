import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditComponent } from './Components/audit/audit.component';
import { AuditRoutingModule } from './query-routing.module';
import { MaterialModule } from '../materials.module';
import { MostrarComponent } from './Components/mostrar/mostrar.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './Components/table/table.component';

@NgModule({
  declarations: [AuditComponent, MostrarComponent, TableComponent],
  imports: [CommonModule, AuditRoutingModule, MaterialModule, HttpClientModule]
})
export class QueryModule {}
