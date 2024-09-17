import { Route } from '@angular/router';
import { ROUTES_PATH } from '../../core/routes';

export default [
  {
    path: ROUTES_PATH.DASHBOARD_PROFILE, // 'dashboard/perfil'
    title: 'Mi perfil',
    loadComponent: () => import('../profile/layout/layout.component'),
  },
  {
    path: ROUTES_PATH.DASHBOARD_PUBLIC_PROFILE_USER_ID,
    title: 'Perfil de usuario',
    loadComponent: () => import('../landing/pages/public-profile/public-profile.component'),
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
  {
    path: '', // In case of empty path, redirect to 'dashboard/perfil'
    redirectTo: ROUTES_PATH.DASHBOARD_PROFILE,
    pathMatch: 'full',
  },
  {
    path: '**', // In case of any other path, redirect to 'dashboard/perfil'
    redirectTo: ROUTES_PATH.DASHBOARD_PROFILE,
  },
] satisfies Route[];
