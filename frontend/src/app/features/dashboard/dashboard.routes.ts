import { Route } from '@angular/router';
import { ROUTES_PATH } from '../../core/routes';

export default [
  {
    path: ROUTES_PATH.DASHBOARD_PROFILE, // 'dashboard/perfil'
    title: 'Mi perfil',
    loadComponent: () => import('../profile/layout/layout.component'),
  },
  {
    path: ROUTES_PATH.DASHBOARD_PUBLIC_PROFILE_USER_ID, // 'dashboard/perfil/publico/:id'
    title: 'Perfil de usuario',
    loadComponent: () => import('./pages/profile/profile.component'),
  },
  {
    path: ROUTES_PATH.DASHBOARD_MESSAGES, // 'dashboard/mensajes'
    title: 'Mensajes',
    loadComponent: () => import('./pages/dashboard-messages/dashboard-messages.component'),
    pathMatch: 'full',
  },
  {
    path: ROUTES_PATH.DASHBOARD_MESSAGES_INBOX, // 'dashboard/mensajes/:id'
    title: 'Mensajes',
    loadComponent: () => import('./pages/dashboard-messages/dashboard-messages.component'),
    pathMatch: 'full',
  },
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
  {
    path: '',  // In case of empty path, redirect to 'dashboard/perfil'
    redirectTo: ROUTES_PATH.DASHBOARD_PROFILE,
    pathMatch: 'full',
  },
  {
    path: '**', // In case of any other path, redirect to 'dashboard/perfil'
    redirectTo: ROUTES_PATH.DASHBOARD_PROFILE,
  },
] satisfies Route[];
