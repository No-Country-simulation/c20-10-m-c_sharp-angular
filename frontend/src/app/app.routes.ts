import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./presentation/features/home/pages/home.component'),
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        title: 'Iniciar sesión',
        loadComponent: () => import('./presentation/features/auth/pages/login/login.component'),
      },
      {
        path: 'register',
        title: 'Registrarse',
        loadComponent: () =>
          import('./presentation/features/auth/pages/register/register.component'),
      },
      {
        path: 'forgot',
        title: 'Restablecer contraseña',
        loadComponent: () => import('./presentation/features/auth/pages/forgot/forgot.component'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
