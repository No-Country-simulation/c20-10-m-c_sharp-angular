import { ResolveFn } from '@angular/router';
import { UserSpecialitiesService } from '../../../core/services';
import { inject } from '@angular/core';
import { UserSpeciality } from '../../../core/interfaces';

export const postDetailed: ResolveFn<UserSpeciality | null> = route => {
  const userSpecialitiesService = inject(UserSpecialitiesService);

  const idPost = route.params['id'];

  if (idPost) {
    return userSpecialitiesService.getUserSpecialitiesById(idPost);
  } else {
    return null;
  }
};
