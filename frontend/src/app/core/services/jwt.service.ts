import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { RefreshTokenResponse } from '../interfaces/auth.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL;
  private readonly refreshEndpoint = environment.ENDPOINT.REFRESH_TOKEN;
  private readonly tokenStorage = environment.SESSION_STORAGE.TOKEN;
  private readonly refreshTokenStorage = environment.SESSION_STORAGE.REFRESH_TOKEN;

  public setAccessToken(token: string): void {
    sessionStorage.setItem(this.tokenStorage, token);
  }

  public getAccessToken(): string | null {
    return sessionStorage.getItem(this.tokenStorage);
  }

  public clearAccessToken(): void {
    sessionStorage.removeItem(this.tokenStorage);
  }

  public setRefreshToken(token: string): void {
    sessionStorage.setItem(this.refreshTokenStorage, token);
  }

  public getRefreshToken(): string | null {
    return sessionStorage.getItem(this.refreshTokenStorage);
  }

  public clearRefreshToken(): void {
    sessionStorage.removeItem(this.refreshTokenStorage);
  }

  public clearTokens(): void {
    this.clearAccessToken();
    this.clearRefreshToken();
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

  public get getRefreshEndpoint(): string {
    return this.baseUrl + this.refreshEndpoint;
  }
}
