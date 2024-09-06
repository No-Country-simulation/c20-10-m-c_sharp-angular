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
    loadComponent: () => import('./features/landing/pages/home/home.component'),
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/layout/layout.component'),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        title: 'Iniciar sesión',
        loadComponent: () => import('./features/auth/pages/login/login.component'),
      },
      {
        path: 'register',
        title: 'Registrarse',
        loadComponent: () => import('./features/auth/pages/register/register.component'),
      },
      {
        path: 'forgot',
        title: 'Restablecer contraseña',
        loadComponent: () => import('./features/auth/pages/forgot/forgot.component'),
      },
    ],
  },

  {
    path: 'publish',
    title: 'Publicar',
    loadComponent: () => import('./features/publish/publish.component').then(m => m.PublishComponent)
  },


  {
    path: '**',
    redirectTo: 'home',
  },

];
