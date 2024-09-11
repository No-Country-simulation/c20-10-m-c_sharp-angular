import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OfferorProfile } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class OfferorProfileService {
  private readonly http = inject(HttpClient);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getOfferorProfileById(id?: number): Observable<OfferorProfile> {
    return this.http.get<OfferorProfile>('/assets/mocks/profile.json');
  }
}
