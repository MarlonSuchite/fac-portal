import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../Services/token/token.service';

export const protectorLoginGuard: CanActivateFn = () => {
  const _tokenService = inject(TokenService);

  const token = _tokenService.getToken();

  if (token) {
    //Redireccionar a vista general
    return false;
  }
  return true;
};
