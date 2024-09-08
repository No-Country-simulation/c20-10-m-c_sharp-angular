import { inject, Injectable, signal } from '@angular/core';
import { UserService as UserApiService } from '../../../core/services';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../../../core/interfaces';
import { ROUTES_PATH } from '../../../core/routes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApi = inject(UserApiService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  user = signal<User | undefined>(undefined);

  public getUserDataForMessages(): Observable<User> {
    return this.userApi.getUserData().pipe(
      tap((user) => {
        this.user.set(user);
      }),
      catchError((error) => {
        console.error('Error al obtener los datos de usuario', error);
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Error al obtener los datos de usuario',
          detail: `Inicie sesión nuevamente`,
        });
        this.router.navigate(['/', ROUTES_PATH.AUTH_LOGIN]);
        return throwError(() => 'Error al obtener los datos de usuario');
      })
    );
  }

}
