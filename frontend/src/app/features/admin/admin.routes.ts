import { Route } from '@angular/router';
import { ROUTES_PATH } from '../../core/routes';

export default [
  {
    path: ROUTES_PATH.ADMIN_OFICIOS,
    title: 'Oficios',
    loadComponent: () => import('./pages/oficios-grid/oficios-grid.component'),
  },
  {
    path: '',
    redirectTo: ROUTES_PATH.ADMIN_OFICIOS,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: ROUTES_PATH.ADMIN_OFICIOS,
  },
] satisfies Route[];
