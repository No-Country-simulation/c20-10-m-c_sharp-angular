import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services';
import { inject } from '@angular/core';

export const dashboardGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/iniciar-sesion']);
    return false;
  }

  return true;
};
