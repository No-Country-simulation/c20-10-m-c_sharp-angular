import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { ValidatorsService } from '../../../../services/validators.service';
import { IAuthLogin } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth-service.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, PasswordModule, CheckboxModule, RouterLink, ButtonDirective, Ripple, InputTextModule, ReactiveFormsModule],
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

  password!: string;
  isButtonDisabled = signal(false);

  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    this.isButtonDisabled.set( true );

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      this.isButtonDisabled.set( false );
      return;
    }

    this.authService.login(this.myForm.value as IAuthLogin)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.isButtonDisabled.set( false ),
        error: () => this.isButtonDisabled.set( false ),
      });
  }
}
