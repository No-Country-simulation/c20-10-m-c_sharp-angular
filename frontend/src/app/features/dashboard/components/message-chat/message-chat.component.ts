import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
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
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
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
  protected readonly ROUTES_PATH = ROUTES_PATH;
  protected readonly getStyleAvatar = getStyleAvatar;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  userService = inject(UserService);

  @ViewChild('textChat') textChat!: ElementRef;

  offererParamId = signal<string | null>(null);
  offererMessages = signal<UserMessages | undefined>(undefined);

  messageNotData = [{ severity: 'info', summary: 'No hay mensajes que mostrar', detail: '' }];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.offererParamId.set(id);

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.offererParamId.set(id);
      this.userService
        .getUserMessagesFromOneUser(id!)
        .pipe(
          tap(usersMessages => {
            this.offererMessages.set(usersMessages);
          }),
          catchError(error => {
            this.offererMessages.set(undefined);
            return throwError(() => error);
          })
        )
        .subscribe();
    });

    if (!id) {
      this.router.navigate(['/', ROUTES_PATH.DASHBOARD_HOME, ROUTES_PATH.DASHBOARD_MESSAGES, '']);
      return;
    }
  }

  getInputValue() {
    if (!this.textChat.nativeElement.value) {
      return;
    }

    const message: Message = {
      message: this.textChat.nativeElement.value,
      createdAt: new Date(),
      userId: this.userService.user()!.id,
    };

    this.userService
      .addNewUserMessage(this.offererParamId()!, message)
      .pipe(
        map(res => res),
        switchMap(() => this.userService.getUserMessagesFromOneUser(this.offererParamId()!))
      )
      .subscribe({
        next: res => {
          this.offererMessages.set(res);
          this.textChat.nativeElement.value = '';
        },
        error: () => {
          this.offererParamId.set(null);
        },
      });
  }

  onGetUserMessages() {
    this.userService
      .getUserMessagesFromOneUser(this.offererParamId()!)
      .pipe(tap(res => this.offererMessages.set(res)))
      .subscribe();
  }
}
