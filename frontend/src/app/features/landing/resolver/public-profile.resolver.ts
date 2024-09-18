import type { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../../core/services';
import { User } from '../../../core/interfaces';

export const publicProfileResolver: ResolveFn<User | null> = route => {
  const userService = inject(UserService);

  const idPost = route.params['id'];

  if (idPost) {
    return userService.getProfileById(idPost);
  } else {
    return null;
  }
};
