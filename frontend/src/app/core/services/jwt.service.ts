import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { RefreshTokenResponse } from '../interfaces/auth.interface';
import { environment } from '../../../environments/environment';
import { CookieOptions, CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly baseUrl = environment.BASE_URL;
  private readonly refreshEndpoint = environment.ENDPOINT.REFRESH_TOKEN;
  private readonly tokenCookie = environment.COOKIES.TOKEN;
  private readonly refreshTokenCookie = environment.COOKIES.REFRESH_TOKEN;
  private readonly loginEndpoint = environment.ENDPOINT.LOGIN;

  private readonly cookieOptions: CookieOptions = {
    path: '/',
    secure: true,
    sameSite: 'Strict',
  };

  public setAccessToken(token: string): void {
    this.cookieService.set(this.tokenCookie, token, { ...this.cookieOptions });
  }

  public getAccessToken(): string | null {
    return this.cookieService.get(this.tokenCookie);
  }

  public clearAccessToken(): void {
    this.cookieService.delete(this.tokenCookie, this.cookieOptions.path);
  }

  public setRefreshToken(token: string): void {
    this.cookieService.set(this.refreshTokenCookie, token, this.cookieOptions);
  }

  public getRefreshToken(): string | null {
    return this.cookieService.get(this.refreshTokenCookie);
  }

  public clearRefreshToken(): void {
    this.cookieService.delete(this.refreshTokenCookie, this.cookieOptions.path);
  }

  public clearTokens(): void {
    this.cookieService.delete(this.tokenCookie, this.cookieOptions.path);
    this.cookieService.delete(this.refreshTokenCookie, this.cookieOptions.path);
  }

  public refreshAccessToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.clearTokens();
      return throwError(() => new Error('No refresh token found'));
    }
    return this.http.post<RefreshTokenResponse>(this.getRefreshEndpoint, {
      refreshToken: refreshToken,
    });
  }

  public get getLoginEndpoint(): string {
    return this.baseUrl + this.loginEndpoint;
  }

  public get getRefreshEndpoint(): string {
    return this.baseUrl + this.refreshEndpoint;
  }
}
