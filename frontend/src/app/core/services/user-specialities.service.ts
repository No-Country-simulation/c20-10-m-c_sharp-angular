import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CreateUserSpeciality, UserSpeciality, UserSpecialitySearch } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserSpecialitiesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL;
  private readonly userSpecilitiesEndpoint = environment.ENDPOINT.USER_SPECIALITIES;

  /**
   *
   * @returns
   */
  public getUserSpeciality(): Observable<UserSpeciality[]> {
    return this.http.get<UserSpeciality[]>(this.baseUrl + this.userSpecilitiesEndpoint);
  }

  /**
   * Creates a new user speciality.
   *
   * @param formValue - The data of the new user speciality to be created.
   * @returns An Observable containing the created `UserSpeciality` object.
   */
  public createUserSpecialities(formValue: CreateUserSpeciality): Observable<UserSpeciality> {
    return this.http.post<UserSpeciality>(this.baseUrl + this.userSpecilitiesEndpoint, formValue);
  }

  /**
   * Retrieves a specific user speciality by its ID.
   *
   * @param id - The unique identifier of the user speciality.
   * @returns An Observable containing the `UserSpecialities` object.
   */
  public getUserSpecialitiesById(id: number): Observable<UserSpeciality> {
    return this.http.get<UserSpeciality>(
      `https://www.contratapp.somee.com/api/userspecialities/${id}`
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
    formValue: UserSpeciality,
    id: number
  ): Observable<UserSpeciality> {
    return this.http.put<UserSpeciality>(
      this.baseUrl + this.userSpecilitiesEndpoint + '/' + id,
      formValue
    );
  }

  /**
   *
   */
  public getPostsBySpeciality(idSpeciality: number): Observable<UserSpecialitySearch[]> {
    return this.http.get<UserSpecialitySearch[]>(
      `https://www.contratapp.somee.com/api/userspecialities/search?IdSpeciality=${idSpeciality}`
    );
  }
}
