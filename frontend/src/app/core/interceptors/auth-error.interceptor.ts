import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.status} - ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 400:
            errorMessage = 'Error 400 - Bad Request.';
            break;
          case 401:
            errorMessage = 'El correo electrónico o la contraseña son incorrectas.';
            break;
          case 404:
            errorMessage = 'Error 404 - Not Found.';
            break;
          case 429:
            errorMessage = 'Error 429 - Too Many Requests.';
            break;
          default:
            errorMessage = `Error ${error.status} - ${error.statusText}`;
        }
      }
      return throwError(() => errorMessage);
    })
  );
};
