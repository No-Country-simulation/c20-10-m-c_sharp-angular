import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthLogin } from '../../presentation/features/auth/interfaces/auth.interface';
import { IResponse } from '../interfaces/api-response.interface';
import { IUser } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);
  private url = environment.url;

  login(data: IAuthLogin): Observable<IResponse<IUser>> {
    return this.http.post<IResponse<IUser>>(`${this.url}/auth/login`, data);
  }

}
