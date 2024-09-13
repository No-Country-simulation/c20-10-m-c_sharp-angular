import { LocalstorageService } from './../../../core/services/localstorage.service';
import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { OfferorSpecialitiesService, SpecialitiesService } from '../../../core/services';
import { environment } from '../../../../environments/environment';
import { Speciality } from '../../../core/interfaces';
import { map, of, switchMap } from 'rxjs';

interface CombinedData {
  currentSpeciality: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  offerorResults: any;
}

export const browserSpecialitiesResolver: ResolveFn<CombinedData> = route => {
  const offerorSearch = inject(OfferorSpecialitiesService);
  const specialitiesService = inject(SpecialitiesService);
  const localstorageService = inject(LocalstorageService);
  const currentSpeciality = route.params['specialityName'];

  const allSpecialitiesKey = environment.LOCAL_STORAGE.ALL_SPECIALITIES;
  const allSpecialities: Speciality[] = localstorageService.get(allSpecialitiesKey);

  if (allSpecialities) {
    const speciality = allSpecialities.find(speciality => {
      return speciality.name.toLowerCase() === currentSpeciality;
    });
    if (speciality?.specialityId) {
      return offerorSearch.getOfferorSpecialities(speciality?.specialityId).pipe(
        map(offerorResults => ({
          currentSpeciality: currentSpeciality,
          offerorResults: offerorResults,
        }))
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
        if (speciality?.specialityId) {
          return offerorSearch.getOfferorSpecialities(speciality.specialityId).pipe(
            map(offerorResults => ({
              currentSpeciality: currentSpeciality,
              offerorResults: offerorResults,
            }))
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
