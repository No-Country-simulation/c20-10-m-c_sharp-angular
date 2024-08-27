import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule, ConfirmDialogModule],
  template: `
    <router-outlet />
    <p-toast key="toast" position="bottom-center" [life]="4000"></p-toast>
    <p-confirmDialog key="dialog"></p-confirmDialog>
  `,
})
export class AppComponent {

  private primengConfig = inject(PrimeNGConfig);

  title = 'frontend';

  constructor() {
    this.primengConfig.ripple = true;
  }
}
