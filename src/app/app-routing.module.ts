import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { SecurityModule } from './security/security.module';
import { QueryModule } from './query/query.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/audit/search',
    pathMatch: 'full'
  },
  {
    path: 'audit',
    loadChildren: () => import('./query/query.module').then(m => m.QueryModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
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
