import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../Services/token/token.service';

export const portectorGuard: CanActivateFn = () => {
  const _tokenService = inject(TokenService);
  const router = inject(Router);

  const token = _tokenService.getToken();

  if (!token) {
    router.navigate(['/security/login']);
    return false;
  }
  return true;
};
