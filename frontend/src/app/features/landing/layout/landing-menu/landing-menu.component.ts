import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_PATH } from '../../../../core/routes';
import { MenuService } from '../../services/menu.service';
import {
  crossfadeAnimation,
  expandAnimation,
  slideDownAnimation,
} from '../../../../shared/animations';

@Component({
  selector: 'app-landing-menu',
  standalone: true,
  imports: [CommonModule],
  animations: [crossfadeAnimation, slideDownAnimation, expandAnimation],
  template: `
    @if (menuService.isMenuOpen()) {
      <div
        class="menu bg-white"
        [class.isOpen]="menuService.isMenuOpen()"
        [@crossfadeAnimation]
        [@slideDownAnimation]>
        <div class="container-app">
          @for (menu of menuItems; track $index) {
            <button
              class="menu-btn font-semibold"
              [class.hover:bg-gray-200]="menuService.currentIndexExpanded() !== $index"
              [class.item-active]="menuService.currentIndexExpanded() === $index"
              (click)="menu.children ? toggleExpand($index) : menu.action()">
              <i class="pi pi-angle-right"></i>
              {{ menu.label }}
            </button>
            @if (menuService.currentIndexExpanded() === $index) {
              <div class="menu-expand " [@expandAnimation]>
                <div class="flex flex-column gap-3 p-3">
                  @for (submenu of menu.children; track $index) {
                    <button class="submenu-btn hover:bg-gray-300" (click)="submenu.action()">
                      {{ submenu.label }}
                    </button>
                  }
                </div>
              </div>
            }
          }
        </div>
      </div>
      <div
        class="fixed top-0 left-0 w-full h-full bg-black-alpha-70 custom-backdrop"
        [@crossfadeAnimation]
        (click)="menuService.closeMenu()"></div>
    }
  `,
  styleUrl: './landing-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingMenuComponent {
  public readonly menuService = inject(MenuService);
  public readonly router = inject(Router);

  public readonly menuItems = [
    {
      label: 'Mi perfil',
      action: () => {
        this.onNavigation(`${ROUTES_PATH.DASHBOARD_HOME}/${ROUTES_PATH.DASHBOARD_PROFILE}`);
      },
    },
    {
      label: 'Mensajes',
      action: () => {
        this.onNavigation(`${ROUTES_PATH.DASHBOARD_HOME}/${ROUTES_PATH.DASHBOARD_MESSAGES}`);
      },
    },
    {
      label: 'Mis publicaciones',
      children: [
        {
          label: 'Ver publicaciones',
          /**
           * @todo Falta la ruta para ver las publicaciones creadas
           */
          action: () => {
            this.onNavigation(`${ROUTES_PATH.DASHBOARD_HOME}/${ROUTES_PATH}`);
          },
        },
        {
          label: 'Ofrecer un servicio',
          action: () => {
            this.onNavigation(`${ROUTES_PATH.DASHBOARD_HOME}/${ROUTES_PATH.DASHBOARD_CREATE_POST}`);
          },
        },
      ],
    },
    {
      label: 'Mis calificaciones',
      /**
       * @todo Falta la ruta para ver las calificaciones
       */
      action: () => {
        this.onNavigation(`${ROUTES_PATH.DASHBOARD_HOME}/${ROUTES_PATH}`);
      },
    },
    {
      /**
       * @todo Falta la ruta para ver los trabajos
       */
      label: 'Mis trabajos',
      action: () => {
        this.onNavigation(`${ROUTES_PATH.DASHBOARD_HOME}/${ROUTES_PATH}`);
      },
    },
  ];

  public toggleExpand(index: number): void {
    this.menuService.currentIndexExpanded.set(
      this.menuService.currentIndexExpanded() === index ? null : index
    );
  }

  private onNavigation(route: string): void {
    this.router.navigate([route]);
  }
}
