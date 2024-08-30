import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthLogin, AuthLoginResponse, AuthRegister, AuthRegisterResponse } from '../interfaces';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly jwtService = inject(JwtService);

  private readonly baseUrl = environment.BASE_URL;
  private readonly loginEndpoint = environment.ENDPOINT.LOGIN;
  private readonly registerEndpoint = environment.ENDPOINT.REGISTER;

  /**
   * Gets the authentication status.
   */
  public authStatus = signal<string | null>(null);

  /**
   * Logs in with the provided email.
   *
   * @param formValue - The login form data, which includes:
   *  - email: string
   *  - password: string
   * @returns An observable that emits the server response.
   */
  public loginWithEmail(formValue: AuthLogin): Observable<AuthLoginResponse> {
    return this.http.post<AuthLoginResponse>(this.baseUrl + this.loginEndpoint, formValue);
  }

  /**
   * Registers a new user with the provided email.
   *
   * @param formValue - The registration form data, which includes:
   *  - name: string
   *  - email: string
   *  - password: string
   * @returns An observable that emits the server response.
   */
  public registerWithEmail(formValue: AuthRegister): Observable<AuthRegisterResponse> {
    return this.http.post<AuthRegisterResponse>(this.baseUrl + this.registerEndpoint, formValue);
  }

  // public forgot() {}

  /**
   * Logs out the user.
   */
  public logout(): void {
    this.jwtService.clearTokens();
    this.authStatus.set(null);
  }
}
