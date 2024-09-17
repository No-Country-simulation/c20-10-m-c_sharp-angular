import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PrimeNGConfig } from 'primeng/api';
import { ThemesService } from './core/themes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MenuService } from './features/landing/services/menu.service';

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
  private readonly themesService = inject(ThemesService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly primengConfig = inject(PrimeNGConfig);
  private readonly menuService = inject(MenuService);
  private readonly router = inject(Router);

  title = 'frontend';

  constructor() {
    this.primengConfig.ripple = true;
  }

  ngOnInit(): void {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuService.closeMenu();
      }
    });
  }
}
