import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { forkJoin, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  CategoriesService,
  SpecialitiesService,
  SessionStorageService,
} from '../../../core/services';
import { CategoryResponse, Speciality } from '../../../core/interfaces';

interface AllData {
  allCategories: CategoryResponse[];
  allSpecialities: Speciality[];
}

export const homeResolver: ResolveFn<AllData> = () => {
  const categoriesService = inject(CategoriesService);
  const specialitiesService = inject(SpecialitiesService);
  const sessionStorageService = inject(SessionStorageService);

  const allCategoriesKey = environment.SESSION_STORAGE.ALL_CATEGORIES;
  const allSpecialitiesKey = environment.SESSION_STORAGE.ALL_SPECIALITIES;

  const allCategories = sessionStorageService.get(allCategoriesKey);
  const allSpecialities = sessionStorageService.get(allSpecialitiesKey);

  if (allCategories && allSpecialities) {
    const allData = {
      allCategories: allCategories,
      allSpecialities: allSpecialities,
    };
    return allData;
  } else {
    const allCategories$ = categoriesService.getAllCategories();
    const allSpecialities$ = specialitiesService.getAllSpecialities();

    return forkJoin([allCategories$, allSpecialities$]).pipe(
      map(([allCategories, allSpecialities]) => {
        sessionStorageService.set(allCategoriesKey, allCategories);
        sessionStorageService.set(allSpecialitiesKey, allSpecialities);
        return { allCategories, allSpecialities };
      })
    );
  }
};
