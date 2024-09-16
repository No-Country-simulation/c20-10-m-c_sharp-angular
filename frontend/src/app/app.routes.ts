import { Routes } from '@angular/router';
import { ROUTES_PATH } from './core/routes';
import { landingRoutes } from './features/landing/routes/landing.routes';
import { authRoutes } from './features/auth/routes/auth.routes';

const { LANDING_HOME } = ROUTES_PATH;

export const routes: Routes = [
  {
    path: '',
    redirectTo: LANDING_HOME,
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/layout/landing-layout/landing-layout.component'),
    children: [
      {
        path: '',
        loadChildren: () => landingRoutes,
      },
      {
        path: '',
        loadChildren: () => authRoutes,
      },
    ],
  },

  {
    path: ROUTES_PATH.DASHBOARD_HOME,
    loadComponent: () =>
      import('./features/dashboard/layout/layout-dashboard/layout-dashboard.component'),
    //   canActivate: [dashboardGuard],
    children: [
      {
        path: '',
        redirectTo: ROUTES_PATH.DASHBOARD_MESSAGES, //TODO: cambiar al perfil o ruta que estaría por defecto
        pathMatch: 'full',
      },
      {
        path: ROUTES_PATH.DASHBOARD_MESSAGES,
        title: 'Mensajes',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard-messages/dashboard-messages.component'),
      },
      {
        path: ROUTES_PATH.DASHBOARD_MESSAGES_INBOX,
        title: 'Mensajes',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard-messages/dashboard-messages.component'),
      },
      {
        path: '**',
        redirectTo: ROUTES_PATH.DASHBOARD_MESSAGES,
        pathMatch: 'full',
      },
      //     {
      //       path: 'profile',
      //       title: 'Perfil',
      //       loadComponent: () => import('./features/dashboard/pages/profile/profile.component'),
      //     },
      //     {
      //       path: 'rating-history',
      //       title: 'Historial de calificaciones',
      //       loadComponent: () =>
      //         import('./features/dashboard/pages/rating-history/rating-history.component'),
      //     },
      //     {
      //       path: 'mis-servicios',
      //       title: 'Mis Servicios',
      //       loadComponent: () =>
      //         import('./features/dashboard/pages/management-services/management-services.component'),
      //     },
      //     {
      //       path: 'gestionar-servicios/:serviceId',
      //       title: 'Servicios',
      //       loadComponent: () =>
      //         import('./features/dashboard/pages/management-services/management-services.component'),
      //     },
    ],
  },

  // {
  //   path: '**',
  //   loadComponent: () => import('./features/landing/pages/not-found/not-found.component'),
  // },
];
