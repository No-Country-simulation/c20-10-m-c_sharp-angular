import { Component } from '@angular/core';
import { MessageGridComponent } from '../../components/message-grid/message-grid.component';
import { MessageChatComponent } from '../../components/message-chat/message-chat.component';

@Component({
  selector: 'app-dashboard-messages',
  standalone: true,
  imports: [
    MessageGridComponent,
    MessageChatComponent,
  ],
  templateUrl: './dashboard-messages.component.html',
  styles: ``
})
export default class DashboardMessagesComponent {

}
