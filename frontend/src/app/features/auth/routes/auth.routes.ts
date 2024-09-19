import { Route } from '@angular/router';
import { authGuard } from '../../../core/guards/auth.guard';
import { ROUTES_PATH } from '../../../core/routes';

const { AUTH_LOGIN, AUTH_FORGOT_PASSWORD, AUTH_REGISTER, AUTH_REGISTER_PROFESSIONAL } = ROUTES_PATH;

export const authRoutes = [
  {
    path: '',
    loadComponent: () => import('../layout/layout.component'),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: AUTH_LOGIN,
        pathMatch: 'full',
      },
      {
        path: AUTH_LOGIN,
        title: 'Iniciar sesión',
        loadComponent: () => import('../pages/login/login.component'),
      },
      {
        path: AUTH_REGISTER,
        title: 'Registrarse',
        loadComponent: () => import('../pages/register/register.component'),
      },
      {
        path: AUTH_REGISTER_PROFESSIONAL,
        title: 'Registrarse como profesional',
        loadComponent: () =>
          import('../pages/register-professional/register-professional.component'),
      },
      {
        path: AUTH_FORGOT_PASSWORD,
        title: 'Restablecer contraseña',
        loadComponent: () => import('../pages/forgot/forgot.component'),
      },
    ],
  },
] satisfies Route[];
