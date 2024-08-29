/** Temporal */ /* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User, UserUpdate } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL;
  private readonly userEndpoint = environment.ENDPOINT.USER;

  /**
   * Gets the user data.
   *
   * @returns An observable that emits the server response.
   */
  public getUserData(): Observable<User> {
    return this.http.get<User>(this.baseUrl + this.userEndpoint);
  }

  /**
   * Updates the user data.
   *
   * @param formValue
   *  - name: string
   *  - surname: string
   * @returns An observable that emits the server response.
   */
  public updateUserData(formValue: UserUpdate): Observable<any> {
    return this.http.put<any>(this.baseUrl + this.userEndpoint, formValue);
  }
}
