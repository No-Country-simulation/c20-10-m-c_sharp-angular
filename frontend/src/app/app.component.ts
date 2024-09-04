import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PrimeNGConfig } from 'primeng/api';
import { ThemesService } from './core/themes';

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
export class AppComponent {
  private readonly themesService = inject(ThemesService);
  private readonly primengConfig = inject(PrimeNGConfig);

  title = 'frontend';

  constructor() {
    this.primengConfig.ripple = true;
  }
}
