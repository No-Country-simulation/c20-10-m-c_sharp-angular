import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { gridChats } from '../../../../shared/utils/grid-chats';
import { AvatarModule } from 'primeng/avatar';
import { DatePipe, JsonPipe, NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_PATH } from '../../../../core/routes';
import { InputTextModule } from 'primeng/inputtext';
import { Button, ButtonDirective } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { PrimeTemplate } from 'primeng/api';
import { DividerModule } from 'primeng/divider';

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
  styles: ``
})
export class MessageChatComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  @ViewChild('textChat') textChat!: ElementRef;

  user = signal<any>( null );
  ownerId = signal<any>(this.route.snapshot.paramMap.get('id'));

  messageNotData = [{ severity: 'info', summary: 'No hay mensajes que mostrar', detail: '' }];
  messageOwner = [{ severity: 'success', summary: '', detail: '' }];
  messageOferente = [{ severity: 'secondary', summary: '', detail: '' }];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.ownerId.set(id);

      if (this.ownerId() === null) {
        this.router.navigate(['/', ROUTES_PATH.DASHBOARD_MESSAGES]);
        return;
      }

      this.user.set(gridChats.filter(user => Number(user.id) === Number(this.ownerId()))[0]);
    });
  }

  getInputValue() {
    const inputValue = this.textChat.nativeElement.value;
    this.textChat.nativeElement.value = '';
    this.textChat.nativeElement.focus();
    console.log(inputValue);
  }

  setMessageOferente: any = (summary: string) => {
    return this.messageOferente = [{
      severity: 'secondary',
      summary: summary,
      detail: ''
    }];
  }

}
