import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

import { CATEGORIES_LIST } from '../../../shared/const/categoriesList.const';
import { TradespeopleService } from '../../../core/services/tradespeople.service';

export const browserCategoriesResolver: ResolveFn<unknown> = route => {
  const tradespeopleService = inject(TradespeopleService);

  const categoriesList = CATEGORIES_LIST;
  const categoryName = route.params['categoryName'];
  const category = categoriesList.find(category => category.value.url === categoryName);

  if (!category) {
    return;
  }

  // const categoryId = category.value.id;
  // return tradespeopleService.getTradespeopleServicesById();
};
