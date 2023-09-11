import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { SecurityModule } from './security/security.module';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AdminModule,
    SecurityModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
