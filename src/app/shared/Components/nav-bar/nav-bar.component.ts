import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  changePassword = false;

  constructor(private router: Router) {}

  clickChangePassword() {
    this.changePassword = true;
  }

  receiveChange(event: boolean) {
    this.changePassword = event;
  }

  logOut(): void {
    /* Servicio */
    this.router.navigate(['/security/login']);
  }
}
