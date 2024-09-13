import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CategoryResponse, Speciality } from '../../../core/interfaces';
import {
  LocalstorageService,
  CategoriesService,
  SpecialitiesService,
} from '../../../core/services';

interface CombinedData {
  currentCategory: string;
  specialitiesByCategory: Speciality[];
}

export const browserCategoriesResolver: ResolveFn<any> = route => {
  const localstorageService = inject(LocalstorageService);
  const categoriesService = inject(CategoriesService);
  const specialitiesService = inject(SpecialitiesService);

  const currentCategory = route.params['categoryName'];

  const allCategoriesKey = environment.LOCAL_STORAGE.ALL_CATEGORIES;
  const allSpecialitiesKey = environment.LOCAL_STORAGE.ALL_SPECIALITIES;

  const allCategories: CategoryResponse[] = localstorageService.get(allCategoriesKey) || [];
  const allSpecialities: Speciality[] = localstorageService.get(allSpecialitiesKey) || [];

  if (allCategories && allSpecialities) {
    const matchingCategory = allCategories.find(
      category => category.name.toLowerCase() === currentCategory.toLowerCase()
    );
    const specialitiesByCategory = allSpecialities.filter(
      specialities => specialities.categoryId === matchingCategory?.categoryId
    );
    const combinedData = {
      currentCategory: currentCategory,
      specialitiesByCategory: specialitiesByCategory,
    };
    return combinedData;
  } else {
    /**
     * @todo hacer las peticiones
     *
     */
    console.log('No hay categorías disponibles.');
    return null;
  }
};
