import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { FormBaseComponent } from '../../components/form-base/form-base.component';
import { AuthService } from '../../../../core/services';
import { AuthLogin } from '../../../../core/interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, FormBaseComponent],
  template: `
    <app-form-base
      [isLogin]="true"
      [buttonDisabled]="isButtonDisabled()"
      (formOutput)="onSubmit($event)">
      <p-button
        class="align-self-end"
        link="true"
        label="¿Olvidaste tu contraseña?"
        routerLink="/restablecer-contraseña" />
    </app-form-base>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private readonly messageService = inject(MessageService);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  public isButtonDisabled = signal<boolean>(false);

  onSubmit(event: AuthLogin): void {
    this.authService
      .loginWithEmail(event)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isButtonDisabled.set(false);
          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: 'Sesión iniciada correctamente',
            detail: `Bienvenido, puedes terminar de llenar tus datos personales`,
          });
          this.router.navigate(['/']);
        },
        error: err => {
          this.isButtonDisabled.set(false);
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'Error',
            detail: `${err}`,
          });
        },
      });
  }
}
