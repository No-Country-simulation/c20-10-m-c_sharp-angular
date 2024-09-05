import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { InputOtpModule } from 'primeng/inputotp';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

import { ShowErrorsDirective, ShowErrorsPasswordDirective } from '../../../../shared/directives';
import { specialCharacterValidator, uppercaseValidator, numberValidator } from '../../validators';
import { ForgotStep, TForgotStep } from '../../utils';
import { AuthService } from '../../../../core/services';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    InputTextModule,
    InputOtpModule,
    PasswordModule,
    ButtonModule,
    ShowErrorsPasswordDirective,
    ShowErrorsDirective,
  ],
  templateUrl: './forgot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ForgotComponent {
  private readonly authService = inject(AuthService);
  public readonly forgotStep = ForgotStep;
  public readonly currentforgotStep = signal<TForgotStep>(ForgotStep.EMAIL);

  public readonly forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    otp: new FormControl(''),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.required,
      Validators.minLength(8),
      specialCharacterValidator(),
      uppercaseValidator(),
      numberValidator(),
    ]),
    confirmNewPassword: new FormControl('', [Validators.required]),
  });

  public changeStep(step: TForgotStep): void {
    this.currentforgotStep.set(step);
  }

  public onEmail() {
    const emailControl = this.email;

    if (this.forgotForm.invalid) {
      if (emailControl) {
        emailControl.markAsTouched();
        emailControl.updateValueAndValidity();
      }
      return;
    }

    const formValue = this.forgotForm.value as { email: string };

    this.authService
      .sendEmailToRecoveryPassword(formValue.email)
      .pipe()
      .subscribe({
        next: () => {
          this.changeStep(ForgotStep.OTP);
        },
        error: () => {
          this.changeStep(ForgotStep.ERROR);
        },
      });
  }

  public onOtp() {
    this.changeStep(ForgotStep.PASSWORD);
  }

  public confirmNewPassword() {
    //
  }

  public get email() {
    return this.forgotForm.get('email');
  }
}
