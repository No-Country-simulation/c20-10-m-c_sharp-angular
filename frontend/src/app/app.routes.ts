import { Routes } from '@angular/router';
import { browserCategoriesResolver } from './features/landing/resolver/browser-categories.resolver';
import { authGuard } from './core/guards/auth.guard';
import { ROUTES_PATH } from './core/routes';

const {
  LANDING_HOME,
  LANDING_BROWSER,
  LANDING_BROWSER_CATEGORIES_ID,

  AUTH_LOGIN,
  AUTH_FORGOT_PASSWORD,
  AUTH_REGISTER,
  AUTH_REGISTER_PROFESSIONAL,
} = ROUTES_PATH;

export const routes: Routes = [
  {
    path: '',
    redirectTo: LANDING_HOME,
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      //import(LANDING_PATH_LAYOUT),
      import('./features/landing/layout/landing-layout/landing-layout.component'),
    children: [
      {
        path: LANDING_HOME,
        title: 'Inicio',
        loadComponent: () => import('./features/landing/pages/home/home.component'),
      },
      {
        path: '',
        redirectTo: LANDING_BROWSER,
        pathMatch: 'full',
      },
      {
        path: LANDING_BROWSER,
        title: 'Explorar',
        loadComponent: () => import('./features/landing/pages/browser/browser.component'),
      },
      {
        path: LANDING_BROWSER_CATEGORIES_ID,
        title: 'Explorar',
        resolve: {
          categories: browserCategoriesResolver,
        },
        loadComponent: () =>
          import('./features/landing/pages/browser-category/browser-category.component'),
      },
      /*{
        path: DASHBOARD_PROFILE,
        title: 'Perfil',
        loadComponent: () => import('./features/profile/layout/layout.component'),
        //canActivate: [authGuard],
      },*/
      {
        path: '',
        loadComponent: () => import('./features/auth/layout/layout.component'),
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
            loadComponent: () => import('./features/auth/pages/login/login.component'),
          },
          {
            path: AUTH_REGISTER,
            title: 'Registrarse',
            loadComponent: () => import('./features/auth/pages/register/register.component'),
          },
          {
            path: AUTH_REGISTER_PROFESSIONAL,
            title: 'Registrarse como profesional',
            loadComponent: () =>
              import('./features/auth/pages/register-professional/register-professional.component'),
          },
          {
            path: AUTH_FORGOT_PASSWORD,
            title: 'Restablecer contraseña',
            loadComponent: () => import('./features/auth/pages/forgot/forgot.component'),
          },
        ],
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: ROUTES_PATH.DASHBOARD_HOME,
        loadComponent: () =>
          import('./features/dashboard/layout/layout-dashboard/layout-dashboard.component'),
        loadChildren: () => import('./features/dashboard/dashboard.routes'),
      },
    ],
  },
  {
    path: '**',
      redirectTo: ROUTES_PATH.LANDING_HOME,
  },
];
