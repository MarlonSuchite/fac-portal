import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { SecurityModule } from './security/security.module';
import { QueryModule } from './query/query.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/query/search',
    pathMatch: 'full'
  },
  {
    path: 'query',
    loadChildren: () => import('./query/query.module').then(m => m.QueryModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AdminModule,
    SecurityModule,
    QueryModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
