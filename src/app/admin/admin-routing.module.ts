import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './Components/users/users.component';
import { ProfilesComponent } from './Components/profiles/profiles.component';
import { ProductsComponent } from './Components/products/products.component';
import { CustomersComponent } from './Components/customers/customers.component';
import { guardianRoles } from '../shared/Guards/guardian-roles.guard';
import { portectorGuard } from '../shared/Guards/protector.guard';
import { ROLE_PROFILE, ROLE_USER } from '../utils/constants';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'userProfile',
    component: UserProfileComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [portectorGuard, guardianRoles(ROLE_USER)]
  },
  {
    path: 'profiles',
    component: ProfilesComponent,
    canActivate: [portectorGuard, guardianRoles(ROLE_PROFILE)]
  },
  {
    path: 'products',
    component: ProductsComponent
    /*  canActivate: [
      portectorGuard,
      guardianRoles(['ROLE_PRODUCTS'])
    ] */
  },
  {
    path: 'customers',
    component: CustomersComponent
    /*   canActivate: [
      portectorGuard,
      guardianRoles(['ROLE_CUSTOMERS'])
    ] */
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
