import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MessageGridComponent } from '../../components/message-grid/message-grid.component';
import { MessageChatComponent } from '../../components/message-chat/message-chat.component';
import { UserService } from '../../services/user.service';
import { tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { gridOffererChats } from '../../../../../assets/demo/grid-offerer-chats';
import { ROUTES_PATH } from '../../../../core/routes';

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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  offererParamId = signal<string | null>(this.route.snapshot.paramMap.get('id'));

  ngOnInit(): void {
    this.userService.getUserData()
      .pipe( tap(() => this.userService.getAllUserMessages()) )
      .subscribe();

    /*if(!this.offererParamId()) { //Redirect to the first chat if there is one
      const firstChat = this.userService.userMessages().length > 0 && this.userService.userMessages()[0].id;
      this.router.navigate(firstChat ? ['/', ROUTES_PATH.DASHBOARD_HOME, ROUTES_PATH.DASHBOARD_MESSAGES, firstChat] : ['/', ROUTES_PATH.DASHBOARD_MESSAGES]);
      return;
    }*/

    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      this.offererParamId.set(id);
      /*const dataOfferer = await this.userService.getUserMessagesFromOneUser(this.offererParamId()!);
      /*const updatedMessages = gridOffererChats.find(offerer => dataOfferer[0].id === offerer.id);
      dataOfferer[0].messages = updatedMessages?.messages;
      this.offererMessages.set(dataOfferer[0]);*/
    });
  }

}
