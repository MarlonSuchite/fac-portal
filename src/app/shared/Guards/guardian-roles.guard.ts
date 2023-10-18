import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../Services/token/token.service';
import { inject } from '@angular/core';

export function guardianRoles(roles: string[]): CanActivateFn {
  return () => {
    const _tokenService = inject(TokenService);
    const routes = inject(Router);
    const rolesToken = _tokenService.getRoles();
    const permisos = rolesToken.every(role => roles.includes(role));
    if (!permisos) {
      routes.navigate(['/admin/users']);
      return false;
    }
    return true;
  };
}
