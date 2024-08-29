import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, DestroyRef } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';

import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthLogin, AuthRegister } from '../../../../core/interfaces/auth.interface';
import { uppercaseValidator } from '../../validators/uppercase.validator';
import { specialCharacterValidator } from '../../validators/special-character.validator';
import { numberValidator } from '../../validators/number.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    DividerModule,
  ],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  public readonly isSubmitted = signal<boolean>(true);

  public readonly registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      specialCharacterValidator(),
      uppercaseValidator(),
      numberValidator(),
    ]),
    // terms: new FormControl(false, [Validators.requiredTrue]),
  });

  public handleRegisterWithEmail(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitted.set(true);
    const formValue = this.registerForm.value as AuthRegister;
    this.authService
      .registerWithEmail(formValue)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isSubmitted.set(false);
          this.handleLoginWithEmail(formValue);
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
      .subscribe(() => this.router.navigate(['home']));
  }

  public handleRegisterWithGoogle(): void {
    console.log('Google!');
  }

  public get email() {
    return this.registerForm.get('email');
  }
  public get password() {
    return this.registerForm.get('password');
  }
  public get terms() {
    return this.registerForm.get('terms');
  }
}
