import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  PostSpecialityFormValue,
  PostSpecialityResponse,
  PutSpecialityFormValue,
  PutSpecialityResponse,
  Speciality,
} from '../interfaces/speciality.interface';

@Injectable({
  providedIn: 'root',
})
export class SpecialitiesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL;
  private readonly specialitiesEndpoint = environment.ENDPOINT.SPECIALITIES;

  /**
   * Retrieves all specialities from the server.
   *
   * @returns An observable containing an array of `Speciality` objects.
   */
  public getAllSpecialities(): Observable<Speciality[]> {
    return this.http.get<Speciality[]>(this.baseUrl + this.specialitiesEndpoint);
  }

  /**
   * Creates a new speciality on the server.
   *
   * @param formValue - The data for the speciality to be created.
   * @returns An observable containing the created `PostSpecialityResponse` object.
   */
  public createSpeciality(formValue: PostSpecialityFormValue): Observable<PostSpecialityResponse> {
    return this.http.post<PostSpecialityResponse>(
      this.baseUrl + this.specialitiesEndpoint,
      formValue
    );
  }

  /**
   * Retrieves a specific speciality by its ID from the server.
   *
   * @param id - The unique identifier of the speciality.
   * @returns An observable containing the `Speciality` object for the given ID.
   */
  public getCategoryById(id: number): Observable<Speciality> {
    return this.http.get<Speciality>(this.baseUrl + this.specialitiesEndpoint + '/' + id);
  }

  /**
   * Updates a specific speciality by its ID on the server.
   *
   * @param formValue - The updated data for the speciality.
   * @param id - The unique identifier of the speciality to be updated.
   * @returns An observable containing the updated `PutSpecialityResponse` object.
   */
  public updateCategoryById(
    formValue: PutSpecialityFormValue,
    id: number
  ): Observable<PutSpecialityResponse> {
    return this.http.put<PutSpecialityResponse>(
      this.baseUrl + this.specialitiesEndpoint + '/' + id,
      formValue
    );
  }

  /**
   * Deletes a specific speciality by its ID from the server.
   *
   * @param id - The unique identifier of the speciality to be deleted.
   * @returns An observable indicating the success of the deletion operation as a boolean.
   */
  public deleteCategoryById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + this.specialitiesEndpoint + '/' + id);
  }

  /**
   * Retrieves all specialities associated with a specific category by its ID.
   *
   * @param id - The unique identifier of the category.
   * @returns An observable containing an array of `Speciality` objects.
   */
  public getSpecialitiesByCategoryId(id: number): Observable<Speciality[]> {
    return this.http.get<Speciality[]>(this.baseUrl + this.specialitiesEndpoint + '/' + id);
  }
}
