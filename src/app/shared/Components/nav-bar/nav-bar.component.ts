import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  changePassword = false;

  clickChangePassword() {
    this.changePassword = true;
  }

  receiveChange(event: boolean) {
    this.changePassword = event;
  }
}
