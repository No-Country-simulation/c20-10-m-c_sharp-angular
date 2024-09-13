import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { OfferorSpecialities } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class OfferorSpecialitiesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL;
  private readonly offerorSpecilitiesEndpoint = environment.ENDPOINT.OFFEROR_SPECIALITIES;

  /**
   * Retrieves all offeror specialities.
   *
   * @returns An Observable containing an array of `OfferorSpecialities` objects.
   */
  public getOfferorSpecialities(idSpeciality: number): Observable<any[]> {
    return this.http.get<any[]>(
      `https://www.contratapp.somee.com/api/userspecialities/search?IdSpeciality=${idSpeciality}`
    );
  }

  /**
   * Creates a new offeror speciality.
   *
   * @param formValue - The data of the new offeror speciality to be created.
   * @returns An Observable containing the created `OfferorSpecialities` object.
   */
  public createOfferorSpecialities(
    formValue: OfferorSpecialities
  ): Observable<OfferorSpecialities> {
    return this.http.post<OfferorSpecialities>(
      this.baseUrl + this.offerorSpecilitiesEndpoint,
      formValue
    );
  }

  /**
   * Retrieves a specific offeror speciality by its ID.
   *
   * @param id - The unique identifier of the offeror speciality.
   * @returns An Observable containing the `OfferorSpecialities` object.
   */
  public getOfferorSpecialitiesById(id: number): Observable<OfferorSpecialities> {
    return this.http.get<OfferorSpecialities>(
      this.baseUrl + this.offerorSpecilitiesEndpoint + '/' + id
    );
  }

  /**
   * Updates an existing offeror speciality by its ID.
   *
   * @param formValue - The updated data for the offeror speciality.
   * @param id - The unique identifier of the offeror speciality to be updated.
   * @returns An Observable containing the updated `OfferorSpecialities` object.
   */
  public updateOfferorSpecialitiesById(
    formValue: OfferorSpecialities,
    id: number
  ): Observable<OfferorSpecialities> {
    return this.http.put<OfferorSpecialities>(
      this.baseUrl + this.offerorSpecilitiesEndpoint + '/' + id,
      formValue
    );
  }
}
