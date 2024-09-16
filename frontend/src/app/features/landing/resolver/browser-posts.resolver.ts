import { LocalstorageService } from '../../../core/services/localstorage.service';
import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { UserSpecialitiesService, SpecialitiesService } from '../../../core/services';
import { environment } from '../../../../environments/environment';
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
  const localstorageService = inject(LocalstorageService);

  const currentSpeciality = route.params['specialityName'];

  const allSpecialitiesKey = environment.SESSION_STORAGE.ALL_SPECIALITIES;
  const allSpecialities: Speciality[] = localstorageService.get(allSpecialitiesKey);

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
