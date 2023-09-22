import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { ListComponent } from './Components/list/list.component';

@NgModule({
  declarations: [NavBarComponent, ListComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [NavBarComponent, ListComponent]
})
export class SharedModule {}
