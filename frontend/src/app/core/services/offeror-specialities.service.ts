import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { UserSpecialities } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserSpecialitiesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL;
  private readonly userSpecilitiesEndpoint = environment.ENDPOINT.USER_SPECIALITIES;

  /**
   * Retrieves all user specialities.
   *
   * @returns An Observable containing an array of `UserSpecialities` objects.
   */
  public getUserSpecialities(idSpeciality: number): Observable<any[]> {
    return this.http.get<any[]>(
      `https://www.contratapp.somee.com/api/userspecialities/search?IdSpeciality=${idSpeciality}`
    );
  }

  /**
   * Creates a new user speciality.
   *
   * @param formValue - The data of the new user speciality to be created.
   * @returns An Observable containing the created `UserSpecialities` object.
   */
  public createUserSpecialities(
    formValue: UserSpecialities
  ): Observable<UserSpecialities> {
    return this.http.post<UserSpecialities>(
      this.baseUrl + this.userSpecilitiesEndpoint,
      formValue
    );
  }

  /**
   * Retrieves a specific user speciality by its ID.
   *
   * @param id - The unique identifier of the user speciality.
   * @returns An Observable containing the `UserSpecialities` object.
   */
  public getUserSpecialitiesById(id: number): Observable<UserSpecialities> {
    return this.http.get<UserSpecialities>(
      this.baseUrl + this.userSpecilitiesEndpoint + '/' + id
    );
  }

  /**
   * Updates an existing user speciality by its ID.
   *
   * @param formValue - The updated data for the user speciality.
   * @param id - The unique identifier of the user speciality to be updated.
   * @returns An Observable containing the updated `UserSpecialities` object.
   */
  public updateUserSpecialitiesById(
    formValue: UserSpecialities,
    id: number
  ): Observable<UserSpecialities> {
    return this.http.put<UserSpecialities>(
      this.baseUrl + this.userSpecilitiesEndpoint + '/' + id,
      formValue
    );
  }
}
