import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { SecurityModule } from './security/security.module';
import { SharedModule } from './shared/shared.module';
import { QueryModule } from './query/query.module';

const routes: Routes = [
  {
    path: 'audit',
    loadChildren: () => import('./query/query.module').then(m => m.QueryModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AdminModule,
    SecurityModule,
    SharedModule,
    QueryModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
