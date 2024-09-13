import { inject } from '@angular/core';
import { type ResolveFn } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { CategoriesService, LocalstorageService } from '../../../core/services';
import { CategoryResponse } from '../../../core/interfaces';
import { tap } from 'rxjs';

export const browserResolver: ResolveFn<CategoryResponse[]> = () => {
  const categoriesService = inject(CategoriesService);
  const localstorageService = inject(LocalstorageService);

  const allCategoriesKey = environment.LOCAL_STORAGE.ALL_CATEGORIES;
  const allCategories = localstorageService.get(allCategoriesKey);

  if (allCategories) {
    return allCategories;
  } else {
    return categoriesService.getAllCategories().pipe(
      tap(data => {
        localstorageService.set(allCategoriesKey, data);
      })
    );
  }
};
