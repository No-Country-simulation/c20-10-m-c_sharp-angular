import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Button, ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { gridOffererChats, contractor } from '../../../../../assets/demo/grid-offerer-chats';
import { DatePipe, NgClass, NgForOf } from '@angular/common';
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
import { FakeUserService } from '../../../../shared/services/fake-user.service';
import { UserService } from '../../services/user.service';

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
  ],
  templateUrl: './message-grid.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageGridComponent implements OnInit {

  private readonly userService = inject(UserService);

  @ViewChild('cm') cm!: ContextMenu;
  users = signal<any>([]);
  owner = contractor;

  protected readonly ROUTES_PATH = ROUTES_PATH;

  ngOnInit(): void {
    this.userService.getAllUserMessages().then((users) => {
      this.users.set(users);
    });
  }
}
