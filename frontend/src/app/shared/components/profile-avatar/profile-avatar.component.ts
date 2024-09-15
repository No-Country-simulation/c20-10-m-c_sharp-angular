import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ROUTES_PATH } from '../../../core/routes';
import { AvatarModule } from 'primeng/avatar';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../features/dashboard/services/user.service';
import { User } from '../../../core/interfaces';
import { tap } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { getStyleAvatar } from '../../utils/stringToColor';

@Component({
  selector: 'app-profile-avatar',
  standalone: true,
  imports: [AvatarModule, RatingModule, FormsModule, RouterLink, JsonPipe],
  templateUrl: './profile-avatar.component.html',
  styleUrl: './profile-avatar.component.css',
})
export class ProfileAvatarComponent implements OnInit {
  private userService = inject(UserService);

  @Input() user = signal<User | undefined>( undefined )
  protected readonly ROUTES_PATH = ROUTES_PATH;
  @Input() classes: any = null;
  @Input() ratingValue: any = 0;
  @Input() message: string = 'Ver perfil';
  @Input() toLink: string = '';
  @Input() isPrivate: boolean = false;
  @Input() styleAvatar!: { 'background-color': string; color: string };

  ngOnInit(): void {
    if (this.isPrivate) {
      this.user.set(this.userService.user());
    } else {
      this.userService
        .getProfilesList()
        .pipe(
          tap(users => {
            const user = users.find(user => user.id === this.toLink);
            if (user) {
              this.user.set(user);
            }
          })
        )
        .subscribe();
    }
  }

  protected readonly getStyleAvatar = getStyleAvatar;
}
