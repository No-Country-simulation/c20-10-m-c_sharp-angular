import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ValidatorsService } from '../../../../shared/services/validators.service';
import { AuthLogin } from '../../../../core/interfaces';
import { AuthService } from './services/auth.service';
import { GenericDialogComponent } from '../../../../shared/components/dialog/generic-dialog/generic-dialog.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, PasswordModule, CheckboxModule, RouterLink, ButtonDirective, Ripple, InputTextModule, ReactiveFormsModule, GenericDialogComponent, RecoveryPasswordComponent],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export default class LoginComponent {

  //Service injection
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  validatorService = inject(ValidatorsService);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);

  //Variables
  formRecoveryPassword = new FormGroup({});
  isButtonDisabled = signal<boolean>(false);
  dialogVisible = false;
  password!: string;
  isDialogAcceptDisabled = true;
  recoveryEmail = '';

  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    this.isButtonDisabled.set(true);

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      this.isButtonDisabled.set(false);
      return;
    }

    this.authService.login(this.myForm.value as AuthLogin)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: () => this.isButtonDisabled(),
      });
  }

  showDialog() {
    this.dialogVisible = true;
  }

  onCancel() {
    this.dialogVisible = false;
    this.formRecoveryPassword.reset();
  }

  onAccept() {
    this.dialogVisible = false;
    this.formRecoveryPassword.reset();
    this.messageService.add({
      key: 'toast',
      severity: 'info',
      summary: 'En construcción',
      detail: `La funcionalidad de recuperación de contraseña está en construcción.`,
    });
  }

  onRecoveryFormValidChange(isValid: boolean) {
    this.isDialogAcceptDisabled = !isValid;
  }

  onRecoveryEmailChange(email: string) {
    this.recoveryEmail = email;
  }

  onDialogVisibleChange(isVisible: boolean) {
    this.dialogVisible = isVisible;
  }

}
