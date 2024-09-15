import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  signal,
  ViewChild, WritableSignal,
} from '@angular/core';
import { contractor } from '../../../../../assets/demo/grid-offerer-chats';
import { AvatarModule } from 'primeng/avatar';
import { DatePipe, JsonPipe, NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_PATH } from '../../../../core/routes';
import { InputTextModule } from 'primeng/inputtext';
import { Button, ButtonDirective } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { PrimeTemplate } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { UserService } from '../../services/user.service';
import { UserMessages } from '../../../../core/interfaces';
import { ProfileAvatarComponent } from '../../../../shared/components/profile-avatar/profile-avatar.component';
import { Message } from '../../../../core/interfaces/message.interface';
import { MessageModule } from 'primeng/message';
import { catchError, tap, throwError } from 'rxjs';
import { getStyleAvatar } from '../../../../shared/utils/stringToColor';

@Component({
  selector: 'app-message-chat',
  standalone: true,
  imports: [
    AvatarModule,
    JsonPipe,
    InputTextModule,
    ButtonDirective,
    Button,
    DatePipe,
    MessagesModule,
    PrimeTemplate,
    NgClass,
    DividerModule,
    ProfileAvatarComponent,
    MessageModule,
  ],
  templateUrl: './message-chat.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageChatComponent implements OnInit {

  protected readonly owner = contractor;
  protected readonly ROUTES_PATH = ROUTES_PATH;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  userService = inject(UserService);

  @ViewChild('textChat') textChat!: ElementRef;

  // offererParamId = signal<string | null>(this.route.snapshot.paramMap.get('id'));
  @Input() offererParamId!: WritableSignal<string | null>;
  offererMessages = signal<UserMessages | undefined>( undefined );

  messageNotData = [{ severity: 'info', summary: 'No hay mensajes que mostrar', detail: '' }];

  ngOnInit() {

    if(!this.offererParamId()) {
      //Redirect to the first chat if there is one
      /*const firstChat = this.userService.userMessages().length > 0 && this.userService.userMessages()[0].id;
      this.router.navigate(['/', ROUTES_PATH.DASHBOARD_HOME, ROUTES_PATH.DASHBOARD_MESSAGES, firstChat]);*/
      return;
    }

    this.userService.getUserMessagesFromOneUser(this.offererParamId()!).pipe(
      tap( usersMessages => {
        this.offererMessages.set(usersMessages);
      }),
      catchError((error) => {
        this.offererMessages.set(undefined);
        return throwError(() => error);
      })
    ).subscribe();

    /*this.route.paramMap.subscribe( params => {
      const id = params.get('id');
      this.offererParamId.set(id);
      const dataOfferer = this.userService.getUserMessagesFromOneUser(this.offererParamId()!);
      const updatedMessages = gridOffererChats.find(offerer => dataOfferer[0].id === offerer.id);
      dataOfferer[0].messages = updatedMessages?.messages;
      this.offererMessages.set(dataOfferer[0]);
    });*/
  }

  async getInputValue() {

    if(!this.textChat.nativeElement.value) {
      return;
    }

    const message: Message = {
      message: this.textChat.nativeElement.value,
      createdAt: new Date(),
      userId: this.userService.user()!.id,
    }

    console.log('Message', message);

    this.userService.addNewUserMessage(this.offererParamId()!, message).pipe(
      tap( message => {
        console.log('Message added', message);
        /*this.offererMessages.update( userMsgs => {
          return {
            ...userMsgs,
            messages: [...userMsgs.messages, message]
          }
        } );*/
      }),
    ).subscribe();

    /*const msgs: MessageResponse[] = [...this.offererMessages()!.messages, message] as MessageResponse[];

    const actualOfferer: UserMessages = {
      ...this.offererMessages(),
      messages: msgs
    }

    this.textChat.nativeElement.value = '';
    this.textChat.nativeElement.focus();
    this.offererMessages.set(actualOfferer);
    gridOffererChats.forEach( (offerer, index) => {
      if(offerer.id === actualOfferer.id) {
        gridOffererChats[index] = actualOfferer;
      }
    });*/
  }

  protected readonly getStyleAvatar = getStyleAvatar;
}
