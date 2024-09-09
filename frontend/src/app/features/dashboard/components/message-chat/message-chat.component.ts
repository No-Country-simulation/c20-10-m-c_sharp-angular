import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { gridOffererChats } from '../../../../../assets/demo/grid-offerer-chats';
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
import { UserMessage } from '../../../../core/interfaces';

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
  ],
  templateUrl: './message-chat.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageChatComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  userService = inject(UserService);

  @ViewChild('textChat') textChat!: ElementRef;

  offererParamId = signal<any>(this.route.snapshot.paramMap.get('id'));
  offerer = signal<any>( null );

  messageNotData = [{ severity: 'info', summary: 'No hay mensajes que mostrar', detail: '' }];

  ngOnInit() {

    if(!this.offererParamId()) {
      this.router.navigate(['/', ROUTES_PATH.DASHBOARD_HOME, ROUTES_PATH.DASHBOARD_MESSAGES, gridOffererChats[0].id]);
      return;
    }

    this.route.paramMap.subscribe(async params => {

      const id = params.get('id');
      this.offererParamId.set(id);
      const dataOfferer = await this.userService.getUserMessagesFromOneUser(this.offererParamId());
      const updatedMessages = gridOffererChats.find(offerer => dataOfferer[0].id === offerer.id);
      dataOfferer[0].messages = updatedMessages?.messages;
      this.offerer.set(dataOfferer[0]);
    });
  }

  async getInputValue() {

    if(!this.textChat.nativeElement.value) {
      return;
    }

    const message: UserMessage = {
      message: this.textChat.nativeElement.value,
      createdAt: new Date(),
      user: this.userService.user()?.id,
    }

    const actualOfferer = {
      ...this.offerer(),
      messages: [...this.offerer().messages, message]
    }

    this.textChat.nativeElement.value = '';
    this.textChat.nativeElement.focus();
    this.offerer.set(actualOfferer);
    gridOffererChats.forEach( (offerer, index) => {
      if(offerer.id === actualOfferer.id) {
        gridOffererChats[index] = actualOfferer;
      }
    });
  }

}
