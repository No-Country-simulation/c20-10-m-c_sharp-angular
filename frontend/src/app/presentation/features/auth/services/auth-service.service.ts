import { inject, Injectable, signal } from '@angular/core';
import { IAuthLogin } from '../interfaces/auth.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthApiService } from '../../../../core/api/auth-api.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { IUser } from '../../../../core/interfaces/user.interface';
import { IResponse } from '../../../../core/interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //services
  private authApi = inject(AuthApiService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  // User Authenticated
  public authUser = signal<IUser | undefined>(undefined);

  login(data: IAuthLogin): Observable<IResponse<IUser>> {
    return this.authApi.login(data).pipe(
      tap(({ data, token }) => {
        this.authUser.set(data);
        localStorage.setItem('token', token!);
        this.router.navigateByUrl('/home');
      }),
      tap(({ data }) => {
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'BIENVENIDO',
          detail: `${data?.firstName} ${data?.lastName}`,
        });
      }),
      catchError(({ error }) => {
        console.log('Error al iniciar sesión', error);
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Error al iniciar sesión!',
          detail: "Correo o contraseña incorrectos.",
        });
        return throwError( () => "Error al iniciar sesión.");
      })
    );
  }
}
