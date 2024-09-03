import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

import { AuthService } from '../../../../core/services';

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, MenuModule],
  template: `
    <div
      class="sticky top-0 flex justify-content-between align-items-center surface-card w-full h-4rem z-5 custom-shadow">
      <div class="container-c flex align-items-center justify-content-between w-full px-5">
        <img class="cursor-pointer" src="/assets/icons/logo.png" width="30" alt="" routerLink="/" />
        <div>
          @if (!authService.isAuthenticated()) {
            <p-button label="Iniciar sesión" link="true" routerLink="/iniciar-sesion" />
            <p-button
              icon="pi pi-user"
              label="Entrar como profesional"
              size="small"
              rounded="true"
              routerLink="/registro-profesional" />
          } @else {
            <p-button
              icon="pi pi-user"
              size="small"
              rounded="true"
              (onClick)="menu.toggle($event)" />
            <p-menu #menu [model]="dropdownActions" [popup]="true" />
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    @keyframes scroll-shadow {
      from {
        box-shadow: none;
      }
      to {
        box-shadow:
          0px 1px 8px rgba(0, 0, 0, 0.08),
          0px 3px 4px rgba(0, 0, 0, 0.1),
          0px 1px 4px -1px rgba(0, 0, 0, 0.1);
      }
    }

    .custom-shadow {
      animation: scroll-shadow linear forwards;
      animation-timeline: scroll();
      animation-range: 0vh 50vh;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingHeaderComponent {
  public readonly authService = inject(AuthService);
  public readonly router = inject(Router);

  public readonly dropdownActions = [
    {
      label: 'Notificaciones',
      icon: 'pi pi-bell',
      command: () => {
        this.router.navigate(['/dashboard/configuracion']);
      },
    },
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      command: () => {
        this.router.navigate(['/dashboard/perfil']);
      },
    },
    {
      label: 'Dashboard',
      icon: 'pi pi-chart-bar',
      command: () => {
        this.router.navigate(['/dashboard/configuracion']);
      },
    },
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      command: () => {
        this.router.navigate(['/dashboard/configuracion']);
      },
    },

    {
      label: 'Cerrar sesión',
      icon: 'pi pi-power-off',
      severity: 'danger',
      command: () => {
        this.authService.logout();
      },
    },
  ];
}
