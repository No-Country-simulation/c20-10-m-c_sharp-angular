import { inject, Injectable, signal } from '@angular/core';
import { UserService as UserApiService } from '../../../core/services';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User, UserMessage } from '../../../core/interfaces';
import { ROUTES_PATH } from '../../../core/routes';
import { FakeUserService } from '../../../shared/services/fake-user.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApi = inject(UserApiService);
  private fakeUserService = inject(FakeUserService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  user = signal<User | undefined>(undefined);

  getUserData(): Observable<User> {
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

  getUserMessagesFromOneUser(idUser: string): Promise<any> { //Observable<any>

    //DEMO, cambiar por el servicio real
    return this.fakeUserService.getUserMessagesFromOneUser(idUser);

    /*return this.userApi.getUserMessagesFromOneUser(idUser).pipe(
      catchError((error) => {
        console.error('Error al obtener los mensajes de usuario', error);
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Error al obtener los mensajes de usuario',
          detail: ``,
        });
        return throwError(() => 'Error al obtener los mensajes de usuario');
      })
    );*/
  }

  getAllUserMessages(): Promise<any> { //Observable<any>

    //DEMO, cambiar por el servicio real
    return this.fakeUserService.getAllUserMessages();

    /*return this.userApi.getAllUserMessages().pipe(
      catchError((error) => {
        console.error('Error al obtener la lista de chats', error);
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Error al obtener la lista de chats',
          detail: ``,
        });
        return throwError(() => 'Error al obtener la lista de chats');
      })
    );*/
  }

  addNewUserMessage(idUser: string, message: UserMessage): Promise<any> { //Observable<any>

    //DEMO, cambiar por el servicio real
    return this.fakeUserService.addNewUserMessage(idUser, message);

    /*return this.userApi.getAllUserMessages().pipe(
      catchError((error) => {
        console.error('Error al agregar el nuevo mensaje', error);
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Error al agregar el nuevo mensaje',
          detail: ``,
        });
        return throwError(() => 'Error al agregar el nuevo mensaje');
      })
    );*/
  }

}
