import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Speciality, SpecialityResponse } from '../interfaces/speciality.interface';

@Injectable({
  providedIn: 'root',
})
export class SpecialityService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL;
  private readonly categoryEndpoint = environment.ENDPOINT.SPECIALITY;

  private buildUrl(speciality?: Speciality): string {
    return speciality && speciality.categoryId
      ? `${this.baseUrl}${this.categoryEndpoint}/${speciality.categoryId}`
      : `${this.baseUrl}${this.categoryEndpoint}`;
  }

  public getAllSpecialities(): Observable<SpecialityResponse[]> {
    return this.http.get<SpecialityResponse[]>(this.buildUrl());
  }

  public createSpeciality(speciality: Speciality): Observable<SpecialityResponse> {
    return this.http.post<SpecialityResponse>(this.buildUrl(), speciality);
  }

  public getCategoryById(speciality: Speciality): Observable<SpecialityResponse> {
    return this.http.get<SpecialityResponse>(this.buildUrl(speciality));
  }

  public updateCategoryById(speciality: Speciality): Observable<SpecialityResponse> {
    return this.http.put<SpecialityResponse>(this.buildUrl(speciality), speciality);
  }

  public deleteCategoryById(speciality: Speciality): Observable<boolean> {
    return this.http.delete<boolean>(this.buildUrl(speciality));
  }
}
