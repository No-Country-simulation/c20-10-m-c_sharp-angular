import { Routes } from '@angular/router';
import { ROUTES_PATH } from './core/routes';
import { landingRoutes } from './features/landing/routes/landing.routes';
import { authRoutes } from './features/auth/routes/auth.routes';
import { dashboardGuard } from './core/guards';

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
    path: '',
    children: [
      {
        path: ROUTES_PATH.DASHBOARD_HOME,
        loadComponent: () =>
          import('./features/dashboard/layout/layout-dashboard/layout-dashboard.component'),
        loadChildren: () => import('./features/dashboard/dashboard.routes'),
        canActivate: [dashboardGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: ROUTES_PATH.LANDING_HOME,
  },
];
