import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { environment } from '../../../../environments/environment';
import {
  UserSpecialitiesService,
  SpecialitiesService,
  SessionStorageService,
} from '../../../core/services';
import { Speciality } from '../../../core/interfaces';
import { map, of, switchMap } from 'rxjs';

interface CombinedData {
  currentSpeciality: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  offerorResults: any;
}

export const browserPostsResolver: ResolveFn<CombinedData> = route => {
  const offerorSearch = inject(UserSpecialitiesService);
  const specialitiesService = inject(SpecialitiesService);
  const sessionStorageService = inject(SessionStorageService);

  const currentSpeciality = route.params['specialityName'];

  const allSpecialitiesKey = environment.SESSION_STORAGE.ALL_SPECIALITIES;
  const allSpecialities: Speciality[] = sessionStorageService.get(allSpecialitiesKey);
  const defaultImage = '/assets/images/landing-page/post-default-image.webp';

  if (allSpecialities) {
    const speciality = allSpecialities.find(speciality => {
      return speciality.name.toLowerCase() === currentSpeciality;
    });
    if (speciality?.specialityId) {
      return offerorSearch.getPostsBySpeciality(speciality?.specialityId).pipe(
        map(offerorResults => {
          const dataWithRoutes = offerorResults.map(res => ({
            ...res,
            route: `explorar/post/${res.userSpecialityId}`,
            src: res.src && res.src.trim() ? res.src : defaultImage,
          }));
          return {
            currentSpeciality: currentSpeciality,
            offerorResults: dataWithRoutes,
          };
        })
      );
    } else {
      return of({
        currentSpeciality: currentSpeciality,
        offerorResults: [],
      });
    }
  } else {
    return specialitiesService.getAllSpecialities().pipe(
      switchMap(data => {
        const speciality = data.find(
          speciality => speciality.name.toLowerCase() === currentSpeciality
        );
        if (speciality) {
          return offerorSearch.getPostsBySpeciality(speciality.specialityId).pipe(
            map(offerorResults => {
              const dataWithRoutes = offerorResults.map(res => ({
                ...res,
                route: `explorar/post/${res.userSpecialityId}`,
                src: res.src && res.src.trim() ? res.src : defaultImage,
              }));
              return {
                currentSpeciality: currentSpeciality,
                offerorResults: dataWithRoutes,
              };
            })
          );
        } else {
          return of({
            currentSpeciality: currentSpeciality,
            offerorResults: [],
          });
        }
      })
    );
  }
};
