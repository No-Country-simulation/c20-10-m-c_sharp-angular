import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

import { CATEGORIES_LIST } from '../../../shared/const/categoriesList.const';

export const browserCategoriesResolver: ResolveFn<unknown> = route => {
  const categoriesList = CATEGORIES_LIST;
  const categoryName = route.params['categoryName'];
  const category = categoriesList.find(category => category.value.url === categoryName);

  if (!category) {
    return;
  }

  // const categoryId = category.value.id;
  // return tradespeopleService.getTradespeopleServicesById();
};
