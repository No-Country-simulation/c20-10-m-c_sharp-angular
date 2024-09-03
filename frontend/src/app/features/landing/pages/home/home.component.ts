import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { AuthService } from './../../../../core/services/auth.service';
import { SidebarModule } from 'primeng/sidebar';
import { TopbarComponent } from '../../../../shared/components/topbar/topbar.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, SidebarModule, TopbarComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export default class HomeComponent {
  
  public readonly authService = inject(AuthService);
}
