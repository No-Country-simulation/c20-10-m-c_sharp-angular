import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
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
import { ROUTES_PATH } from '../../../../core/routes';
import { UserService } from '../../services/user.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ProfileAvatarComponent } from '../../../../shared/components/profile-avatar/profile-avatar.component';
import { MessageModule } from 'primeng/message';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { User, UserMessages } from '../../../../core/interfaces';
import { MessageService } from 'primeng/api';

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
  ],
  templateUrl: './message-grid.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageGridComponent implements OnInit {
  private router = inject(Router);
  private messageService = inject(MessageService);

  @Input() offererParamId!: WritableSignal<string | null>;
  readonly userService = inject(UserService);
  readonly paramId = signal<string | null>(null);

  @ViewChild('cm') cm!: ContextMenu;
  // owner = signal<User | undefined>( undefined );
  value!: number;

  protected readonly ROUTES_PATH = ROUTES_PATH;
  protected readonly messages = signal<UserMessages[]>([]);

  ngOnInit(): void {
    this.paramId.set(this.offererParamId());
    this.userService.getAllUserMessages().pipe().subscribe();

    // console.log('this.userService.user()', this.userService.user());
    // this.owner.update( () => this.userService.user() );

    if (this.offererParamId()) {
      this.userService
        .getProfilesList()
        .pipe(
          tap(profiles => {
            const profile = profiles.find(profile => profile.id === this.offererParamId());

            if (!profile) {
              this.offererParamId.set(null);
              this.userService.userMessages.set([]);
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

              this.paramId.set( null );
              return;
            }

            const newUserMsg: UserMessages = {
              id: profile.id,
              name: `${profile.firstName} ${profile.lastName}`,
              image: '',
              createdAt: new Date(),
              messages: [],
            };

            this.userService.userMessages.update( msgs => [...msgs, newUserMsg] );
            this.messages.set([...this.userService.userMessages()]);
          })
        )
        .subscribe();
    }
  }
}
