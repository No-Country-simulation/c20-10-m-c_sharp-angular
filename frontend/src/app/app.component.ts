import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { PrimeNGConfig } from 'primeng/api';

import { SessionStorageService, UserLocationService } from './core/services';
import { MenuService } from './features/landing/services/menu.service';
import { ThemesService } from './core/themes';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule, ConfirmDialogModule],
  template: `
    <router-outlet />
    <p-toast key="logout" position="bottom-right"></p-toast>
    <p-toast key="toast" position="bottom-center" [life]="4000"></p-toast>
    <p-confirmDialog key="dialog"></p-confirmDialog>
  `,
})
export class AppComponent implements OnInit {
  private readonly sessionStorageService = inject(SessionStorageService);
  private readonly userLocationService = inject(UserLocationService);
  private readonly themesService = inject(ThemesService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly primengConfig = inject(PrimeNGConfig);
  private readonly menuService = inject(MenuService);
  private readonly router = inject(Router);

  private readonly userLocationKey = environment.SESSION_STORAGE.CURRENT_USER_LOCATION;
  title = 'frontend';

  constructor() {
    this.primengConfig.ripple = true;
  }

  ngOnInit(): void {
    const currentUserLocation = this.sessionStorageService.get(this.userLocationKey);
    if (!currentUserLocation) {
      this.userLocationService
        .getUserLocation()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(res => this.userLocationService.currentUserLocation.set(res));
    }
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuService.closeMenu();
      }
    });
  }
}
