import { SessionStorageService } from './../../../core/services/session-storage.service';
import { inject } from '@angular/core';
import { type ResolveFn } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { CategoriesService } from '../../../core/services';
import { CategoryResponse } from '../../../core/interfaces';
import { map, tap, of } from 'rxjs';

interface CombinedData {
  res: CategoryResponse[];
  currentRoute: string;
}

export const browserResolver: ResolveFn<CombinedData> = route => {
  const categoriesService = inject(CategoriesService);
  const sessionStorageService = inject(SessionStorageService);

  const allCategoriesKey = environment.SESSION_STORAGE.ALL_CATEGORIES;
  const allCategories = sessionStorageService.get(allCategoriesKey);

  if (allCategories) {
    const combinedData = {
      res: allCategories,
      currentRoute: route.url[0].path,
    };
    return of(combinedData);
  } else {
    return categoriesService.getAllCategories().pipe(
      map(res => {
        const data = res.map(category => ({
          ...category,
          route: route.url[0].path + '/categoria/',
        }));
        return {
          res: data,
          currentRoute: route.url[0].path,
        };
      }),
      tap(res => {
        sessionStorageService.set(allCategoriesKey, res.res);
      })
    );
  }
};
