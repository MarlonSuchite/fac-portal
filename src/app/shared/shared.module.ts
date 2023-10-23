import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { ListComponent } from './Components/list/list.component';
import { TranslateModule } from '@ngx-translate/core';
import { DialogComponent } from './Components/dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [NavBarComponent, ListComponent, DialogComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    TranslateModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [NavBarComponent, ListComponent]
})
export class SharedModule {}
