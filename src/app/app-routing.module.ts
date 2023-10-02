import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  imports: [RouterModule.forRoot(routes), SecurityModule, QueryModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
