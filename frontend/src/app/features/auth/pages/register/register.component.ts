import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, DestroyRef } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';

import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthLogin } from '../../../../core/interfaces/auth.interface';
import { AuthFormBase, FormBaseComponent } from '../../components/form-base/form-base.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    DividerModule,
    FormBaseComponent,
  ],
  template: `
    <app-form-base [isLogin]="false" (formOutput)="handleRegisterWithEmail($event)"></app-form-base>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  public readonly isSubmitted = signal<boolean>(true);

  public handleRegisterWithEmail(event: AuthFormBase): void {
    this.isSubmitted.set(true);
    this.authService
      .registerWithEmail(event)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isSubmitted.set(false);
          this.handleLoginWithEmail(event);
        },
        error: err => {
          this.isSubmitted.set(false);
          console.error('Error', err);
        },
      });
  }

  public handleLoginWithEmail(formValue: AuthLogin): void {
    this.authService
      .loginWithEmail(formValue)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.router.navigate(['inicio']));
  }

  public handleRegisterWithGoogle(): void {
    console.log('Google!');
  }

  // public get terms() {
  //   return this.registerForm.get('terms');
  // }
}
