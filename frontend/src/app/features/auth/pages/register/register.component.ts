/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  DestroyRef,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AutoFocusModule } from 'primeng/autofocus';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { UserFormRegister, AuthLogin } from '../../../../core/interfaces';
import { UserService, AuthService } from '../../../../core/services';
import { specialCharacterValidator, uppercaseValidator, numberValidator } from '../../validators';
import { ShowErrorsPasswordDirective, ShowErrorsDirective } from '../../../../shared/directives';
import { AuthFormBase } from '../../components/form-base/form-base.component';

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
    RouterLink,
    AutoFocusModule,
    PasswordModule,
    ShowErrorsPasswordDirective,
    ShowErrorsDirective,
  ],
  styles: `
    .custom-pl {
      padding-left: 2.5rem !important;
    }
  `,
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  private readonly messageService = inject(MessageService);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  public isButtonDisabled = signal<boolean>(false);
  public formUserVal = signal<boolean>(false);
  public userFormRegister = signal<any>(null);

  public readonly formRegister = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      specialCharacterValidator(),
      uppercaseValidator(),
      numberValidator(),
    ]),
  });

  public get firstName() {
    return this.formRegister.get('firstName');
  }
  public get lastName() {
    return this.formRegister.get('lastName');
  }
  public get email() {
    return this.formRegister.get('email');
  }
  public get password() {
    return this.formRegister.get('password');
  }

  public handleSubmit() {
    if (this.formRegister.invalid) {
      this.formRegister.markAllAsTouched();
      return;
    }
    const formValue = this.formRegister.value as AuthFormBase;
    this.handleRegisterWithEmail(formValue);
  }

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
          this.putUserData();
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

  public putUserData() {
    const { firstName, lastName } = this.formRegister.value;
    if (firstName && lastName) {
      const updateData: UserFormRegister = { firstName, lastName };
      this.userService
        .updateUserData(updateData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: res => {
            console.log(res);
          },
          error: err => {
            console.error('Error', err);
          },
        });
    }
  }
}
