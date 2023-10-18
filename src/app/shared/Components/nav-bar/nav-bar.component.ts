import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../Services/token/token.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  changePassword = false;

  constructor(
    private router: Router,
    private _tokenService: TokenService
  ) {}

  clickChangePassword() {
    this.changePassword = true;
  }

  receiveChange(event: boolean) {
    this.changePassword = event;
  }

  logOut(): void {
    /* Servicio */
    this._tokenService.deleteToken();
    this._tokenService.deleteRoles();
    this.router.navigate(['/security/login']);
  }
}
