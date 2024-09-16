import { inject, Injectable, signal } from '@angular/core';
import { JwtService, UserService as UserApiService } from '../../../core/services';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User, UserMessages } from '../../../core/interfaces';
import { Message, MessageCreatedResponse } from '../../../core/interfaces/message.interface';
import { ROUTES_PATH } from '../../../core/routes';
import { FakeUserService } from '../../../shared/services/fake-user.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApi = inject(UserApiService);
  private fakeUserService = inject(FakeUserService);
  private messageService = inject(MessageService);
  private jwtService = inject(JwtService);
  private router = inject(Router);
  user = signal<User | undefined>(undefined);
  userMessages = signal<UserMessages[]>([]);

  getUserData(): Observable<User> {
    return this.userApi.getUserData().pipe(
      tap((user) => {
        this.user.set(user);
      }),
      catchError((error) => {
        console.error('Error al obtener los datos de usuario', error);
        this.jwtService.clearTokens();
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Error al obtener los datos de usuario',
          detail: `Inicie sesión nuevamente`,
        });

        setTimeout(() => {
          this.router.navigate(['/', ROUTES_PATH.AUTH_LOGIN]);
        }, 500);

        return throwError(() => 'Error al obtener los datos de usuario');
      })
    );
  }

  getUserMessagesFromOneUser(idUser: string): Observable<UserMessages> {
    return this.userApi.getUserMessagesFromOneUser(idUser).pipe(
      catchError((error) => {

        if( error.includes('404') ) throwError(() => ({ 'errorStatus': 404, 'errorMessage': 'Mensajes del usuario no encontrados' }));

        return throwError(() => error);
      })
    );
  }

  getAllUserMessages(): Observable<UserMessages[]> { //Promise<any>
    return this.userApi.getAllUserMessages().pipe(
      tap( userMessages => this.userMessages.set(userMessages) ),
      catchError((error) => {
        console.error('Error al obtener la lista de chats', error);
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Error al obtener la lista de chats',
          detail: ``,
        });
        return throwError(() => error);
      })
    );
  }

  addNewUserMessage(idUser: string, message: Message): Observable<MessageCreatedResponse> {

    return this.userApi.addNewUserMessage(idUser, message).pipe(
      catchError((error) => {
        console.error('Error al agregar el mensaje', error);
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Error al agregar el mensaje',
          detail: ``,
        });
        return throwError(() => 'Error al agregar el mensaje');
      })
    );
  }

  getProfilesList(): Observable<User[]> {
    return this.userApi.getProfilesList().pipe(
      catchError((error) => {
        console.error('Error la lista de perfiles de usuario', error);
        this.jwtService.clearTokens();
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Error la lista de perfiles de usuario',
          detail: `Verifique con el administrador`,
        });

        return throwError(() => 'Error la lista de perfiles de usuario');
      })
    );
  }

}
