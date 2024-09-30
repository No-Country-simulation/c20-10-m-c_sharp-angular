import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  AuthLogin,
  AuthLoginResponse,
  AuthRegister,
  AuthRegisterResponse,
  ForgotPassword,
  ForgotPasswordResponse,
} from '../interfaces';
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
  private readonly registerProfessionalEndpoint = environment.ENDPOINT.REGISTER;
  private readonly forgotPasswordEndpoint = environment.ENDPOINT.FORGOT_SEND_EMAIL;
  private readonly forgotConfirmEndpoint = environment.ENDPOINT.FORGOT_CONFIRM;

  /**
   * Gets the authentication status.
   */
  public isAuthenticated = signal<string | null>(null);

  constructor() {
    this.initializeAuthStatus();
  }

  private initializeAuthStatus() {
    const token = this.jwtService.getAccessToken();
    if (token) {
      this.isAuthenticated.set(token);
    }
  }

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

  /**
   * Registers a new user as professional with the provided email.
   *
   * @param formValue - The registration form data, which includes:
   *  - name: string
   *  - email: string
   *  - password: string
   * @returns An observable that emits the server response.
   */
  public registerProfessionalWithEmail(formValue: AuthRegister): Observable<AuthRegisterResponse> {
    return this.http.post<AuthRegisterResponse>(
      this.baseUrl + this.registerProfessionalEndpoint,
      formValue
    );
  }

  /**
   *
   * @param email
   * @returns An observable that emits the server response.
   */
  public sendEmailToRecoveryPassword(email: string): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(
      this.baseUrl + this.forgotPasswordEndpoint,
      email
    );
  }

  /**
   *
   * @param formValue - The recovery password form data, which includes:
   * - email: string
   * - resetCode: string
   * - newPassword: string
   * @returns An observable that emits the server response.
   */
  public confirmRecoveryPassword(formValue: ForgotPassword): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(
      this.baseUrl + this.forgotConfirmEndpoint,
      formValue
    );
  }

  /**
   * Logs out the user.
   */
  public logout(): void {
    this.jwtService.clearTokens();
    this.isAuthenticated.set(null);
  }
}
