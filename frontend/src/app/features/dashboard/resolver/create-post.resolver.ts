import type { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { forkJoin, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  CategoriesService,
  SpecialitiesService,
  SessionStorageService,
  UserService,
} from '../../../core/services';
import { CategoryResponse, Speciality, User } from '../../../core/interfaces';

interface AllData {
  allCategories: CategoryResponse[];
  allSpecialities: Speciality[];
  userData: User;
}

export const createPostResolver: ResolveFn<AllData> = () => {
  const categoriesService = inject(CategoriesService);
  const specialitiesService = inject(SpecialitiesService);
  const sessionStorageService = inject(SessionStorageService);
  const userService = inject(UserService);

  const userDataKey = environment.SESSION_STORAGE.USER_DATA;
  const allCategoriesKey = environment.SESSION_STORAGE.ALL_CATEGORIES;
  const allSpecialitiesKey = environment.SESSION_STORAGE.ALL_SPECIALITIES;

  const userData = sessionStorageService.get(userDataKey);
  const allCategories = sessionStorageService.get(allCategoriesKey);
  const allSpecialities = sessionStorageService.get(allSpecialitiesKey);

  if (allCategories && allSpecialities && userData) {
    const allData = {
      allCategories: allCategories,
      allSpecialities: allSpecialities,
      userData: userData,
    };
    return allData;
  } else {
    const allCategories$ = categoriesService.getAllCategories().pipe(
      map(res => {
        const data = res.map(category => ({
          ...category,
          route: 'explorar/categoria/',
        }));
        return data;
      })
    );
    const allSpecialities$ = specialitiesService.getAllSpecialities();
    const userData$ = userService.getUserData();

    return forkJoin([allCategories$, allSpecialities$, userData$]).pipe(
      map(([allCategories, allSpecialities, userData]) => {
        sessionStorageService.set(allCategoriesKey, allCategories);
        sessionStorageService.set(allSpecialitiesKey, allSpecialities);
        sessionStorageService.set(userDataKey, userData);
        return { allCategories, allSpecialities, userData };
      })
    );
  }
};
