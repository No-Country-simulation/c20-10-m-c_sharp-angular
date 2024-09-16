import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Button, ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { DatePipe, JsonPipe, NgClass, NgForOf } from '@angular/common';
import { ContextMenu, ContextMenuModule } from 'primeng/contextmenu';
import { AvatarModule } from 'primeng/avatar';
import { MessagesModule } from 'primeng/messages';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { UserService } from '../../services/user.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';
import { ROUTES_PATH } from '../../../../core/routes';
import { ProfileAvatarComponent } from '../../../../shared/components/profile-avatar/profile-avatar.component';
import { UserMessages } from '../../../../core/interfaces';
import { getStyleAvatar } from '../../../../shared/utils/stringToColor';
import { SearchBoxComponent } from '../../../../shared/components/search-box/search-box.component';

@Component({
  selector: 'app-message-grid',
  standalone: true,
  imports: [
    ButtonDirective,
    Ripple,
    DatePipe,
    ContextMenuModule,
    NgForOf,
    AvatarModule,
    MessagesModule,
    DataViewModule,
    NgClass,
    TagModule,
    Button,
    DividerModule,
    InputGroupModule,
    InputTextModule,
    InputGroupAddonModule,
    RatingModule,
    FormsModule,
    ProfileAvatarComponent,
    MessageModule,
    JsonPipe,
    SearchBoxComponent,
  ],
  templateUrl: './message-grid.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageGridComponent implements OnInit {
  private router = inject(Router);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);

  protected readonly getStyleAvatar = getStyleAvatar;

  readonly userService = inject(UserService);
  readonly paramId = signal<string | null>(null);

  @ViewChild('cm') cm!: ContextMenu;
  value!: number;
  initialValue = '';

  protected readonly ROUTES_PATH = ROUTES_PATH;
  protected readonly messages = signal<UserMessages[]>([]);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.paramId.set(id);

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.paramId.set(id);
    });

    if (!id) {
      this.userService.getAllUserMessages().subscribe(res => this.messages.set(res));
      return;
    }

    if (id) {
      this.userService
        .getProfilesList()
        .pipe(
          map(profiles => {
            return profiles.find(profile => profile.id === id);
          }),
          switchMap(profile => {
            if (!profile) {
              throw new Error('Perfil no encontrado');
            }

            return this.userService
              .getAllUserMessages()
              .pipe(map(userMessages => ({ profile, userMessages })));
          })
        )
        .subscribe({
          next: ({ profile, userMessages }) => {
            const newUserMsg: UserMessages = {
              id: 0,
              idOtherUser: profile.id,
              name: `${profile.firstName} ${profile.lastName}`,
              image: '',
              createdAt: new Date(),
              messages: [],
            };

            const userMessagesFiltered = userMessages.find(
              msg => msg.idOtherUser === newUserMsg.idOtherUser
            );
            this.messages.set(!userMessagesFiltered ? [...userMessages, newUserMsg] : userMessages);
            this.userService.userMessages.set(
              !userMessagesFiltered ? [...userMessages, newUserMsg] : userMessages
            );
          },
          error: () => {
            this.userService.getAllUserMessages().subscribe(res => this.messages.set(res));
            this.router.navigate([
              '/',
              ROUTES_PATH.DASHBOARD_HOME,
              ROUTES_PATH.DASHBOARD_MESSAGES,
              '',
            ]);

            this.messageService.add({
              key: 'toast',
              severity: 'error',
              summary: 'Error al obtener los mensajes de usuario',
              detail: `No se ha encontrado el usuario con id: ${this.paramId()}`,
            });

            this.paramId.set(null);
            return;
          },
        });
    }
  }

  searchChatUser(value: string): void {
    this.messages.set( this.userService.userMessages().filter( userMsg => userMsg.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ) );
  }
}
