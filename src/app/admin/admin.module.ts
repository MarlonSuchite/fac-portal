import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './Components/users/users.component';
import { FormComponent } from './Components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../materials.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UsersComponent, FormComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class AdminModule {}
