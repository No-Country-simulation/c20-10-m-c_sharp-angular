import { Route } from '@angular/router';
import { ROUTES_PATH } from '../../core/routes';

const {
  DASHBOARD_PROFILE,
  DASHBOARD_PUBLIC_PROFILE_USER_ID,
  DASHBOARD_MESSAGES,
  DASHBOARD_MESSAGES_INBOX,
  DASHBOARD_PUBLISH,
  DASHBOARD_MY_POSTS,
  DASHBOARD_MY_WORKS,
  DASHBOARD_NOTIFICATIONS,
} = ROUTES_PATH;

export default [
  {
    path: DASHBOARD_PROFILE, // 'dashboard/perfil'
    title: 'Mi perfil',
    loadComponent: () => import('../profile/layout/layout.component'),
  },
  {
    path: DASHBOARD_PUBLISH, // 'dashboard/publicar'
    title: 'Publicar',
    loadComponent: () => import('../dashboard/pages/create-publish/publish.component'),
  },
  {
    path: DASHBOARD_PUBLIC_PROFILE_USER_ID,
    title: 'Perfil de usuario',
    loadComponent: () => import('../landing/pages/public-profile/public-profile.component'),
  },
  {
    path: DASHBOARD_MESSAGES, // 'dashboard/mensajes'
    title: 'Mensajes',
    loadComponent: () => import('./pages/dashboard-messages/dashboard-messages.component'),
    pathMatch: 'full',
  },
  {
    path: DASHBOARD_MESSAGES_INBOX, // 'dashboard/mensajes/:id'
    title: 'Mensajes',
    loadComponent: () => import('./pages/dashboard-messages/dashboard-messages.component'),
    pathMatch: 'full',
  },
  {
    path: '', // In case of empty path, redirect to 'dashboard/perfil'
    redirectTo: DASHBOARD_PROFILE,
    pathMatch: 'full',
  },
  {
    path: DASHBOARD_MY_POSTS,
    title: 'Mis publicaciones',
    loadComponent: () => import('./pages/my-posts/my-posts.component'),
  },
  {
    path: DASHBOARD_MY_WORKS,
    title: 'Mis trabajos',
    loadComponent: () => import('./pages/my-works/my-works.component'),
  },
  {
    path: DASHBOARD_NOTIFICATIONS,
    title: 'Notificaciones',
    loadComponent: () => import('./pages/notifications/notifications.component'),
  },
  {
    path: '**', // In case of any other path, redirect to 'dashboard/perfil'
    redirectTo: DASHBOARD_PROFILE,
  },
] satisfies Route[];
