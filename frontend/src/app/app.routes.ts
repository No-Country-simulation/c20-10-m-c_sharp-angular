import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { ROUTES_PATH } from './core/routes';

import {
  homeResolver,
  browserResolver,
  browserPostsResolver,
  browserViewSpecialityResolver,
} from './features/landing/resolver';

const {
  LANDING_HOME,
  LANDING_BROWSER,
  LANDING_BROWSER_CATEGORIES_ID,

  AUTH_LOGIN,
  AUTH_FORGOT_PASSWORD,
  AUTH_REGISTER,
  AUTH_REGISTER_PROFESSIONAL,
  LANDING_BROWSER_DETAILED_POST,
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
        resolve: [homeResolver],
        loadComponent: () => import('./features/landing/pages/home/home.component'),
      },
      {
        path: '',
        redirectTo: LANDING_BROWSER,
        pathMatch: 'full',
      },
      {
        path: ROUTES_PATH.LANDING_BROWSER,
        title: 'Explorar categorias',
        resolve: {
          data: browserResolver,
        },
        loadComponent: () => import('./features/landing/pages/browser/browser.component'),
      },
      {
        path: LANDING_BROWSER_CATEGORIES_ID,
        title: 'Explorar',
        resolve: {
          data: browserViewSpecialityResolver,
        },
        loadComponent: () => import('./features/landing/pages/browser/browser.component'),
      },
      {
        path: ROUTES_PATH.LANDING_BROWSER_CATEGORIES_ID_ESPECIALITY,
        title: 'Explorar',
        resolve: {
          data: browserPostsResolver,
        },
        loadComponent: () =>
          import('./features/landing/pages/browser-speciality/browser-speciality.component'),
      },
      {
        path: ROUTES_PATH.LANDING_BROWSER_DETAILED_POST,
        title: 'publicacion', //TODO: cambiar el title
        resolve: [],
        loadComponent: () => import('./features/landing/pages/share-post/share-post.component'),
      },
      {
        path: ROUTES_PATH.DASHBOARD_PUBLIC_PROFILE,
        title: 'Perfil pubico',
        loadComponent: () =>
          import('./features/landing/pages/public-profile/public-profile.component').then(
            m => m.PublicProfileComponent
          ),
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
