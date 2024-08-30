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
  template: `
    @let authStatus = authService.authStatus();

    @let status = authStatus ? 'Usuario autenticado' : 'Usuario no autenticado';

    <div class="w-full">
      <app-topbar />
    </div>
    <div class="flex flex-column justify-content-center align-items-center">
      <h1>Test</h1>
      <p class="text-3xl">
        Status: <span [class]="authStatus ? 'text-green-500' : 'text-red-500'">{{ status }}</span>
      </p>
      @if (!authStatus) {
        <p-button label="Iniciar sesión" outlined="true" routerLink="/auth/login" />
      } @else {
        <p-button
          label="Cerrar sesión"
          outlined="true"
          severity="danger"
          (click)="authService.logout()" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
  public readonly authService = inject(AuthService);
}
