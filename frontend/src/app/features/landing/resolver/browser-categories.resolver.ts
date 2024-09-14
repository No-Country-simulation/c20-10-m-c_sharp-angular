import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map, switchMap, of, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  CategoriesService,
  SpecialitiesService,
  SessionStorageService,
} from '../../../core/services';
import { CategoryResponse, Speciality } from '../../../core/interfaces';

interface CombinedData {
  currentCategory: string;
  currentRoute: string;
  res: Speciality[];
}

export const browserCategoriesResolver: ResolveFn<CombinedData> = route => {
  const sessionStorageService = inject(SessionStorageService);
  const categoriesService = inject(CategoriesService);
  const specialitiesService = inject(SpecialitiesService);

  const allCategoriesKey = environment.SESSION_STORAGE.ALL_CATEGORIES;
  const allSpecialitiesKey = environment.SESSION_STORAGE.ALL_SPECIALITIES;

  const currentCategory = route.params['categoryName'];

  const specialitiesByCategory: Speciality[] = sessionStorageService.get(`${currentCategory}Key`);
  const allCategories: CategoryResponse[] = sessionStorageService.get(allCategoriesKey);
  const allSpecialities: Speciality[] = sessionStorageService.get(allSpecialitiesKey);

  if (specialitiesByCategory) {
    return of({
      currentCategory: currentCategory,
      currentRoute: route.url[0].path,
      res: specialitiesByCategory,
    });
  } else if (false) {
    const matchingCategory = allCategories.find(
      category => category.name.toLowerCase() === currentCategory.toLowerCase()
    );
    const specialitiesByCategory = allSpecialities.filter(
      speciality => speciality.categoryId === matchingCategory?.categoryId
    );
    return of({
      currentCategory: currentCategory,
      currentRoute: route.url[0].path,
      res: specialitiesByCategory,
    });
  } else {
    return categoriesService.getAllCategories().pipe(
      switchMap(categories => {
        const matchingCategory = categories.find(
          category => category.name.toLowerCase() === currentCategory.toLowerCase()
        );
        if (!matchingCategory) {
          console.error('Categoría no encontrada:', currentCategory);
          return of({
            currentCategory: currentCategory,
            currentRoute: route.url[0].path,
            res: [],
          });
        }
        return specialitiesService.getSpecialitiesByCategoryId(matchingCategory.categoryId).pipe(
          map(res => {
            console.log(res);
            const specialities = Array.isArray(res) ? res : [res];

            const data = specialities.map(speciality => ({
              ...speciality,
              route: `${route.url[0].path}/categoria/${currentCategory}/especialidad/`,
            }));

            return {
              currentCategory: currentCategory,
              currentRoute: route.url[0].path,
              res: data,
            };
          }),
          tap(res => {
            sessionStorageService.set(allCategoriesKey, res.res);
          })
        );
      })
    );
  }
};
