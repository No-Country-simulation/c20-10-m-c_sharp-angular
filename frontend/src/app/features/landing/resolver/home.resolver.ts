import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { forkJoin, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  CategoriesService,
  SpecialitiesService,
  LocalstorageService,
} from '../../../core/services';
import { CategoryResponse, Speciality } from '../../../core/interfaces';

interface AllData {
  allCategories: CategoryResponse[];
  allSpecialities: Speciality[];
}

export const homeResolver: ResolveFn<AllData> = () => {
  const categoriesService = inject(CategoriesService);
  const specialitiesService = inject(SpecialitiesService);
  const localstorageService = inject(LocalstorageService);

  const allCategoriesKey = environment.LOCAL_STORAGE.ALL_CATEGORIES;
  const allSpecialitiesKey = environment.LOCAL_STORAGE.ALL_SPECIALITIES;

  const allCategories = localstorageService.get(allCategoriesKey);
  const allSpecialities = localstorageService.get(allSpecialitiesKey);

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
        localstorageService.set(allCategoriesKey, allCategories);
        localstorageService.set(allSpecialitiesKey, allSpecialities);
        return { allCategories, allSpecialities };
      })
    );
  }
};
