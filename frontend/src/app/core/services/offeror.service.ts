import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Offeror, OfferorFormValue } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class OfferorService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL;
  private readonly offerorEndpoint = environment.ENDPOINT.OFFEROR;

  /**
   * Retrieves an offeror by its ID.
   *
   * @param id - The unique identifier of the offeror.
   * @returns An Observable containing the `Offeror` object.
   */
  public getOfferorById(id: number): Observable<Offeror> {
    return this.http.get<Offeror>(this.baseUrl + this.offerorEndpoint + '/' + id);
  }

  /**
   * Updates an offeror's information by its ID.
   *
   * @param formValue - The updated values for the offeror, excluding its ID and specialities.
   * @param id - The unique identifier of the offeror to be updated.
   * @returns An Observable containing the updated `Offeror` object.
   */
  public updateOfferorById(formValue: OfferorFormValue, id: number): Observable<Offeror> {
    return this.http.put<Offeror>(this.baseUrl + this.offerorEndpoint + '/' + id, formValue);
  }
}
