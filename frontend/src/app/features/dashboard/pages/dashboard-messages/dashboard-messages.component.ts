import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MessageGridComponent } from '../../components/message-grid/message-grid.component';
import { MessageChatComponent } from '../../components/message-chat/message-chat.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard-messages',
  standalone: true,
  imports: [
    MessageGridComponent,
    MessageChatComponent,
  ],
  templateUrl: './dashboard-messages.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardMessagesComponent implements OnInit {

  private userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getUserData().subscribe();
  }

}
