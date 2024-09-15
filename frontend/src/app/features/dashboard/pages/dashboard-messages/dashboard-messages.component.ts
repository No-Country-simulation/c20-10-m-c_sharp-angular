import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MessageGridComponent } from '../../components/message-grid/message-grid.component';
import { MessageChatComponent } from '../../components/message-chat/message-chat.component';
import { UserService } from '../../services/user.service';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  offererParamId = signal<string | null>(this.route.snapshot.paramMap.get('id'));

  ngOnInit(): void {
    this.userService.getUserData()
      .pipe( tap(() => this.userService.getAllUserMessages()) )
      .subscribe();

    this.route.paramMap.subscribe( params => this.offererParamId.set(params.get('id')) );
  }

}
