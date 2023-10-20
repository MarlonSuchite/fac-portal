import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../Services/token/token.service';
import { inject } from '@angular/core';

export function guardianRoles(roles: string): CanActivateFn {
  return () => {
    const _tokenService = inject(TokenService);
    const routes = inject(Router);
    const rolesToken = _tokenService.getRoles();
    console.log('Entre');
    if (rolesToken.includes(roles)) {
      return true;
    }
    return false;
  };
}
