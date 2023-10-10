import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityModule } from './security/security.module';
import { QueryModule } from './query/query.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/security/login',
    pathMatch: 'full'
  },
  {
    path: 'query',
    loadChildren: () => import('./query/query.module').then(m => m.QueryModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'security',
    loadChildren: () =>
      import('./security/security.module').then(m => m.SecurityModule)
  },
  {
    path: 'admin',
    loadChildren: () =>
    import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), SecurityModule, QueryModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
