import { HttpResponse, type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, tap, throwError } from 'rxjs';

import { JwtService, AuthService } from '../services';
import { AuthLoginResponse } from '../interfaces/auth.interface';

/**
 * JWT Interceptor
 *
 * This interceptor handles the inclusion of the JWT access token in the headers
 * of outgoing HTTP requests and manages the automatic refresh of tokens when
 * a 401 Unauthorized response is encountered.
 *
 * - If an access token is present, it attaches the token to the request's Authorization header.
 * - On successful responses, it extracts and stores new access and refresh tokens from the response body.
 * - If a 401 error occurs (indicating the access token might have expired), it attempts to
 *   refresh the token using the stored refresh token and retries the original request with
 *   the new access token.
 * - If token refresh fails, it clears the tokens and propagates the error.
 *
 * @param req The outgoing HTTP request.
 * @param next The next interceptor in the chain or the backend handler.
 * @returns The handled request, potentially modified with the new token, or an error if the request fails.
 */
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtService);
  const authService = inject(AuthService);

  const accessToken = jwtService.getAccessToken();
  const isLoginRequest = req.url.includes(jwtService.getLoginEndpoint);

  // If the access token exists, clone the request and add the Authorization header.
  if (accessToken && !isLoginRequest) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    authService.isAuthenticated.set(accessToken);
    return next(clonedRequest);
  }

  return next(req).pipe(
    tap(event => {
      // If the request succeeds, store the new access and refresh tokens from the response.
      if (event instanceof HttpResponse) {
        const body = event.body as AuthLoginResponse;
        if (body?.accessToken) {
          jwtService.setAccessToken(body.accessToken);
          authService.isAuthenticated.set(body?.accessToken);
        }
        if (body?.refreshToken) {
          jwtService.setRefreshToken(body.refreshToken);
        }
      }
    }),
    catchError(error => {
      /**
       * If a 401 error occurs and the request is not to the refresh endpoint,
       * attempt to refresh the access token.
       */
      if (error.status === 401 && !isLoginRequest && accessToken) {
        return jwtService.refreshAccessToken().pipe(
          switchMap(res => {
            jwtService.setAccessToken(res.accessToken);
            authService.isAuthenticated.set(res.accessToken);
            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.accessToken}`,
              },
            });
            return next(clonedRequest);
          }),
          catchError(refreshError => {
            // If token refresh fails, clear tokens and propagate the error.
            jwtService.clearTokens();
            return throwError(() => refreshError);
          })
        );
      }
      // Propagate the error if it's not a 401 or if it's from the refresh endpoint.
      return throwError(() => error);
    })
  );
};
