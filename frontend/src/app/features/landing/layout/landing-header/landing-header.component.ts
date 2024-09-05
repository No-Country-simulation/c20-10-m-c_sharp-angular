import { MessageService, ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AuthService } from '../../../../core/services';
import { LogoComponent } from '../../../../shared/components';

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonModule,
    MenuModule,
    BadgeModule,
    ConfirmDialogModule,
    LogoComponent,
  ],
  template: `
    <div
      class="sticky top-0 flex justify-content-center align-items-center w-full h-5rem px-4 py-4 z-5 custom-bg custom-shadow">
      <div class="flex justify-content-between align-items-center w-full h-full">
        <!-- <app-logo [size]="3" /> -->
        <img
          src="/assets/icons/contratAppLogo.svg"
          width="48"
          alt="logo de la aplicacion"
          routerLink="/" />
        <div class="flex">
          <p-button icon="pi pi-user text-2xl text-white" size="small" text="true" />
          <p-button icon="pi pi-bell text-2xl text-white" size="small" text="true">
            <i
              class="absolute top-0 left-50 mt-2 select-none"
              severity="danger"
              pBadge
              value="4"></i>
          </p-button>
        </div>
      </div>
      <!-- <div class="container-c flex align-items-center justify-content-between w-full px-5">
        <app-logo [size]="3" />
        <div class="flex align-items-center">
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
              styleClass="w-2rem h-2rem text-color"
              icon="pi pi-user"
              text="true"
              (onClick)="menu.toggle($event)" />
            <div class="relative">
              <p-button styleClass="w-2rem h-2rem text-color" icon="pi pi-bell" text="true" />
              @if (true) {
                <i class="custom-badge text-sm" pBadge value="2"></i>
              }
            </div>

            <p-menu #menu [model]="dropdownActions" [popup]="true" />
          }
        </div>
      </div> -->
    </div>
    <p-confirmDialog />
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

    .custom-badge {
      span {
        width: 0.25rem !important;
        min-width: 0.25rem !important;
      }
    }

    .custom-shadow {
      animation: scroll-shadow linear forwards;
      animation-timeline: scroll();
      animation-range: 0vh 50vh;
    }

    .custom-bg {
      background-color: #231f20;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingHeaderComponent {
  public readonly confirmationService = inject(ConfirmationService);
  public readonly messageService = inject(MessageService);
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
      icon: 'pi pi-sign-out',
      severity: 'danger',
      command: () => {
        this.onLogout();
      },
    },
  ];

  private onLogout(): void {
    this.confirmationService.confirm({
      message: '¿Deseas cerrar sesión?',
      rejectButtonStyleClass: 'p-danger',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'La sesión ha sido cerrada',
          detail: 'Gracias por preferirnos',
          key: 'logout',
        });
        this.authService.logout();
      },
    });
  }
}
