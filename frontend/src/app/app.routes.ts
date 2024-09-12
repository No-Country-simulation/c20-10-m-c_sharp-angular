import { Routes } from '@angular/router';
import { browserCategoriesResolver } from './features/landing/resolver/browser-categories.resolver';
import { authGuard } from './core/guards/auth.guard';
import { ROUTES_PATH } from './core/routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES_PATH.LANDING_HOME,
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/layout/landing-layout/landing-layout.component'),
    children: [
      {
        path: ROUTES_PATH.LANDING_HOME,
        title: 'Inicio',
        loadComponent: () => import('./features/landing/pages/home/home.component'),
      },
      {
        path: '',
        redirectTo: ROUTES_PATH.LANDING_BROWSER,
        pathMatch: 'full',
      },
      {
        path: ROUTES_PATH.LANDING_BROWSER,
        title: 'Explorar',
        loadComponent: () => import('./features/landing/pages/browser/browser.component'),
      },
      {
        path: ROUTES_PATH.LANDING_BROWSER_CATEGORIES_ID,
        title: 'Explorar',
        resolve: {
          categories: browserCategoriesResolver,
        },
        loadComponent: () =>
          import('./features/landing/pages/browser-category/browser-category.component'),
      },
      // {
      //   path: 'como-funciona',
      //   title: 'Como funciona',
      //   loadComponent: () => import('./features/landing/pages/how-it-works/how-it-works.component'),
      // },
      // {
      //   path: 'professional-profile/:professionalId/:professionalName',
      //   title: 'Perfil profesional',
      //   loadComponent: () =>
      //     import('./features/landing/pages/professional-profile/professional-profile.component'),
      // },
      {
        path: '',
        loadComponent: () => import('./features/auth/layout/layout.component'),
        canActivate: [authGuard],
        children: [
          {
            path: '',
            redirectTo: ROUTES_PATH.AUTH_LOGIN,
            pathMatch: 'full',
          },
          {
            path: ROUTES_PATH.AUTH_LOGIN,
            title: 'Iniciar sesión',
            loadComponent: () => import('./features/auth/pages/login/login.component'),
          },
          {
            path: ROUTES_PATH.AUTH_REGISTER,
            title: 'Registrarse',
            loadComponent: () => import('./features/auth/pages/register/register.component'),
          },
          {
            path: ROUTES_PATH.AUTH_REGISTER_PROFESSIONAL,
            title: 'Registrarse como profesional',
            loadComponent: () =>
              import('./features/auth/pages/register-professional/register-professional.component'),
          },
          {
            path: ROUTES_PATH.AUTH_FORGOT_PASSWORD,
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
        loadComponent: () => import('./features/dashboard/layout/layout-dashboard/layout-dashboard.component'),
        loadChildren: () => import('./features/dashboard/dashboard.routes'),
      }
    ]
  },
  // {
  //   path: '**',
  //   loadComponent: () => import('./features/landing/pages/not-found/not-found.component'),
  // },
];
