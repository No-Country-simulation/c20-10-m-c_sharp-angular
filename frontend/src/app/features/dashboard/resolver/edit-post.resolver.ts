import type { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { forkJoin, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  CategoriesService,
  SpecialitiesService,
  SessionStorageService,
  UserService,
  UserSpecialitiesService,
} from '../../../core/services';
import { CategoryResponse, Speciality, User, UserSpeciality } from '../../../core/interfaces';

interface AllData {
  allCategories: CategoryResponse[];
  allSpecialities: Speciality[];
  userData: User;
  userSpecialityData: UserSpeciality;
}

export const editPostResolver: ResolveFn<any> = route => {
  const categoriesService = inject(CategoriesService);
  const specialitiesService = inject(SpecialitiesService);
  const userSpecialitiesService = inject(UserSpecialitiesService);
  const sessionStorageService = inject(SessionStorageService);
  const userService = inject(UserService);

  const currentSpecialityId = route.params['id'];

  const userDataKey = environment.SESSION_STORAGE.USER_DATA;
  const allCategoriesKey = environment.SESSION_STORAGE.ALL_CATEGORIES;
  const allSpecialitiesKey = environment.SESSION_STORAGE.ALL_SPECIALITIES;

  const userData = sessionStorageService.get(userDataKey);
  const allCategories = sessionStorageService.get(allCategoriesKey);
  const allSpecialities = sessionStorageService.get(allSpecialitiesKey);

  if (allCategories && allSpecialities && userData) {
    const userSpecialityData$ =
      userSpecialitiesService.getUserSpecialitiesById(currentSpecialityId);
    return userSpecialityData$.pipe(
      map(userSpecialityData => ({
        allCategories,
        allSpecialities,
        userData,
        userSpecialityData,
      }))
    );
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
    const userSpecialityData$ =
      userSpecialitiesService.getUserSpecialitiesById(currentSpecialityId);
    const allSpecialities$ = specialitiesService.getAllSpecialities();
    const userData$ = userService.getUserData();

    return forkJoin([allCategories$, allSpecialities$, userData$, userSpecialityData$]).pipe(
      map(([allCategories, allSpecialities, userData, userSpecialityData]) => {
        sessionStorageService.set(allCategoriesKey, allCategories);
        sessionStorageService.set(allSpecialitiesKey, allSpecialities);
        sessionStorageService.set(userDataKey, userData);
        return { allCategories, allSpecialities, userData, userSpecialityData };
      })
    );
  }
};
