import { Component, Input } from '@angular/core';
import { ROUTES_PATH } from '../../../core/routes';
import { AvatarModule } from 'primeng/avatar';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-avatar',
  standalone: true,
  imports: [
    AvatarModule,
    RatingModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './profile-avatar.component.html',
  styleUrl: './profile-avatar.component.css'
})
export class ProfileAvatarComponent {

  @Input() user: any = null;
  protected readonly ROUTES_PATH = ROUTES_PATH;
  @Input() classes: any = null;
  @Input() ratingValue: any = 0;
  @Input() message: string = 'Ver perfil';
  @Input() toLink: string = '';
  @Input() isPrivate: boolean = false;
}
