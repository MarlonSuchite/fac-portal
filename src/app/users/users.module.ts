import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './Components/users/users.component';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { MaterialModule } from '../materials.module';

@NgModule({
  declarations: [UsersComponent, UsersListComponent],
  imports: [CommonModule, UsersRoutingModule, MaterialModule]
})
export class UsersModule {}
