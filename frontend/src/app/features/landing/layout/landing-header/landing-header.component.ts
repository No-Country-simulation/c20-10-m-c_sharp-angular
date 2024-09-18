import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';

import { AuthService } from '../../../../core/services';
import { LogoComponent } from '../../../../shared/components';
import { ROUTES_PATH } from '../../../../core/routes';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, BadgeModule, LogoComponent, AvatarModule],
  template: `
    <div
      class="sticky top-0 left-0 flex justify-content-center align-items-center h-5rem custom-bg custom-shadow w-full custom-z-index">
      <div
        class="relative py-3 px-3 flex justify-content-between align-items-center w-full container-app">
        <button class="reset-btn menu-btn" (click)="menuService.toggleMenu()">
          <svg
            class="ham hamRotate ham8"
            viewBox="0 0 100 100"
            [class.active]="menuService.isMenuOpen()">
            <path
              class="line top"
              d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20" />
            <path class="line middle" d="m 30,50 h 40" />
            <path
              class="line bottom"
              d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20" />
          </svg>
        </button>
        <img
          src="/assets/icons/contratAppLogo.svg"
          class="cursor-pointer"
          width="48"
          alt="logo de la aplicacion"
          routerLink="/" />
        <div class="flex gap-1">
          <!-- <p-avatar label="JA" size="large" shape="circle" /> -->
          <p-button
            icon="pi pi-user text-2xl text-white"
            size="small"
            text="true"
            (onClick)="
              authService.isAuthenticated()
                ? onNavigate(routesPath.DASHBOARD_HOME + '/' + routesPath.DASHBOARD_PROFILE)
                : onNavigate(routesPath.AUTH_LOGIN)
            " />
          @if (authService.isAuthenticated()) {
            <p-button
              icon="pi pi-bell text-2xl text-white"
              size="small"
              text="true"
              (onClick)="
                onNavigate(routesPath.DASHBOARD_HOME + '/' + routesPath.DASHBOARD_NOTIFICATIONS)
              ">
              <i
                class="absolute top-0 left-50 mt-2 select-none"
                severity="danger"
                pBadge
                value="4"></i>
            </p-button>
          }
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./landing-header.component.css'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingHeaderComponent {
  public readonly authService = inject(AuthService);
  public readonly menuService = inject(MenuService);
  public readonly router = inject(Router);

  public readonly routesPath = ROUTES_PATH;

  public onNavigate(route: string): void {
    this.router.navigate(['/' + route]);
  }

  // private onLogout(): void {
  //   this.confirmationService.confirm({
  //     message: '¿Deseas cerrar sesión?',
  //     rejectButtonStyleClass: 'p-danger',
  //     accept: () => {
  //       this.messageService.add({
  //         severity: 'info',
  //         summary: 'La sesión ha sido cerrada',
  //         detail: 'Gracias por preferirnos',
  //         key: 'logout',
  //       });
  //       this.authService.logout();
  //     },
  //   });
  // }
}
