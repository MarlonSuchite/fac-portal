import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './Components/users/users.component';
import { ProfilesComponent } from './Components/profiles/profiles.component';


const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'profiles',
    component: ProfilesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
