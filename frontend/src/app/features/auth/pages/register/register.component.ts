import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, DestroyRef, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { AuthFormBase, FormBaseComponent } from '../../components/form-base/form-base.component';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthLogin } from '../../../../core/interfaces/auth.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    DividerModule,
    FormBaseComponent,
  ],
  template: `
    <app-form-base
      [isLogin]="false"
      [buttonDisabled]="isButtonDisabled()"
      (formOutput)="handleRegisterWithEmail($event)" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  private readonly messageService = inject(MessageService);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  public isButtonDisabled = signal<boolean>(false);

  public handleRegisterWithEmail(event: AuthFormBase): void {
    this.authService
      .registerWithEmail(event)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.handleLoginWithEmail(event);
        },
        error: err => {
          console.error('Error', err);
        },
      });
  }

  public handleLoginWithEmail(formValue: AuthLogin): void {
    this.authService
      .loginWithEmail(formValue)
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
