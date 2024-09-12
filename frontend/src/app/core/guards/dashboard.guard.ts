import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services';
import { inject } from '@angular/core';
import { ROUTES_PATH } from '../routes';

export const dashboardGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate([ROUTES_PATH.AUTH_LOGIN]);
    return false;
  }

  return true;
};
