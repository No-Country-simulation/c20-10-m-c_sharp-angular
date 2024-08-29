import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAuthLogin, ILoginOkResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private url = environment.url;

  login(data: IAuthLogin): Observable<ILoginOkResponse> { //IResponse<IUser>
    console.log('data', data);
    return this.http.post<ILoginOkResponse>(`${this.url}/identity/login`, data);
  }

}
