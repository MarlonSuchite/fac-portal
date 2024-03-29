import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormUsersComponent } from './Components/users/form-users/form-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { UsersComponent } from './Components/users/users.component';
import { ProfilesComponent } from './Components/profiles/profiles.component';
import { FormProfileComponent } from './Components/profiles/form-profile/form-profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductsComponent } from './Components/products/products.component';
import { MatCardModule } from '@angular/material/card';
import { ProductsFormComponent } from './Components/products/products-form/products-form.component';
import { CustomersComponent } from './Components/customers/customers.component';
import { FormCustomerComponent } from './Components/customers/form-customer/form-customer.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { SecurityModule } from '../security/security.module';

@NgModule({
  declarations: [
    FormUsersComponent,
    UsersComponent,
    ProfilesComponent,
    FormProfileComponent,
    ProductsComponent,
    ProductsFormComponent,
    CustomersComponent,
    FormCustomerComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    TranslateModule,
    MatSlideToggleModule,
    MatExpansionModule,
    HttpClientModule,
    MatDialogModule,
    MatCardModule,
    SecurityModule
  ]
})
export class AdminModule {}
