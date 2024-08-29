import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { IAuthLogin, ILoginOkResponse } from '../../../../../core/interfaces';
import { AuthService as AuthApiService } from '../../../../../core/services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //services
  private authApi = inject(AuthApiService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  // User Authenticated
  public authUser = signal<ILoginOkResponse | undefined>(undefined);

  login(data: IAuthLogin): Observable<ILoginOkResponse> {
    return this.authApi.login(data).pipe(
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
          detail: `Te invitamos a terminar de llenar tus datos personales`,
        });
      }),
      catchError(( error) => throwError( () => error ))
    );
  }
}
