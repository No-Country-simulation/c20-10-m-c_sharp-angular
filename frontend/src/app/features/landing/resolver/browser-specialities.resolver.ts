import { LocalstorageService } from './../../../core/services/localstorage.service';
import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { OfferorSpecialitiesService, SpecialitiesService } from '../../../core/services';
import { environment } from '../../../../environments/environment';
import { Speciality } from '../../../core/interfaces';
import { switchMap } from 'rxjs';

export const browserSpecialitiesResolver: ResolveFn<any> = (route, state) => {
  const offerorSearch = inject(OfferorSpecialitiesService);
  const specialitiesService = inject(SpecialitiesService);
  const localstorageService = inject(LocalstorageService);
  const currentSpeciality = route.params['specialityName'];

  const allSpecialitiesKey = environment.LOCAL_STORAGE.ALL_SPECIALITIES;
  const allSpecialities: Speciality[] = localstorageService.get(allSpecialitiesKey);

  console.log(currentSpeciality);

  if (allSpecialities) {
    const speciality = allSpecialities.find(speciality => {
      return speciality.name.toLowerCase() === currentSpeciality;
    });
    if (speciality?.specialityId) {
      return offerorSearch.getOfferorSpecialities(speciality?.specialityId);
    } else {
      return null;
    }
  } else {
    // specialitiesService.getAllSpecialities().pipe(
    //   switchMap(data => {
    //     console.log(data);
    //   })
    // );

    return offerorSearch.getOfferorSpecialities(1);
  }
};
