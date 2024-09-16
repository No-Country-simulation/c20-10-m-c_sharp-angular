import { Route } from '@angular/router';

import { ROUTES_PATH } from '../../../core/routes';
import {
  homeResolver,
  browserResolver,
  browserPostsResolver,
  browserViewSpecialityResolver,
  postDetailed,
} from '../resolver';

const {
  LANDING_HOME,
  LANDING_BROWSER,
  LANDING_BROWSER_CATEGORIES_ID,
  LANDING_BROWSER_CATEGORIES_ID_ESPECIALITY,
  LANDING_BROWSER_DETAILED_POST_ID,
  DASHBOARD_PUBLIC_PROFILE_ID,
} = ROUTES_PATH;

export const landingRoutes = [
  {
    path: LANDING_HOME,
    title: 'Inicio',
    resolve: [homeResolver],
    loadComponent: () => import('../pages/home/home.component'),
  },
  {
    path: '',
    redirectTo: LANDING_BROWSER,
    pathMatch: 'full',
  },
  {
    path: LANDING_BROWSER,
    title: 'Explorar categorias',
    resolve: {
      data: browserResolver,
    },
    loadComponent: () => import('../pages/browser/browser.component'),
  },
  {
    path: LANDING_BROWSER_CATEGORIES_ID,
    title: 'Explorar',
    resolve: {
      data: browserViewSpecialityResolver,
    },
    loadComponent: () => import('../pages/browser/browser.component'),
  },
  {
    path: LANDING_BROWSER_CATEGORIES_ID_ESPECIALITY,
    title: 'Explorar',
    resolve: {
      data: browserPostsResolver,
    },
    loadComponent: () => import('../pages/browser-speciality/browser-speciality.component'),
  },
  {
    path: LANDING_BROWSER_DETAILED_POST_ID,
    title: 'publicacion',
    resolve: [postDetailed],
    loadComponent: () => import('../pages/share-post/share-post.component'),
  },
  {
    path: DASHBOARD_PUBLIC_PROFILE_ID,
    title: 'Perfil publico',
    resolve: {},
    loadComponent: () =>
      import('../pages/public-profile/public-profile.component').then(
        m => m.PublicProfileComponent
      ),
  },
] satisfies Route[];
