import type { ResolveFn } from '@angular/router';
import { UserService, UserSpecialitiesService } from '../../../core/services';
import { inject } from '@angular/core';

export const publicProfileResolver: ResolveFn<any> = (route, state) => {
  const userService = inject(UserService);

  const idPost = route.params['id'];
  console.log(route);

  if (idPost) {
    console.log(idPost);
    return userService.getProfileById(idPost);
  } else {
    return null;
  }
};
