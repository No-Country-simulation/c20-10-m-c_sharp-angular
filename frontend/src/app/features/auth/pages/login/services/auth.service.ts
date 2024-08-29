import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService as AuthApiService } from '../../../../../core/services';
import { AuthLogin, AuthLoginResponse } from '../../../../../core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //services
  private authApi = inject(AuthApiService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  // User Authenticated
  public authUser = signal<AuthLoginResponse | undefined>(undefined);

  login(data: AuthLogin): Observable<AuthLoginResponse> {
    return this.authApi.loginWithEmail(data).pipe(
      tap(( data) => {
        this.authUser.set(data);
        localStorage.setItem('dataToken', JSON.stringify( data ));
        this.router.navigateByUrl('/home');
      }),
      tap(() => {
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'BIENVENIDO',
          detail: `Te invitamos a terminar de llenar tus datos personalez`,
        });
      }),
      catchError(( error) => throwError( () => error ))
    );
  }
}
