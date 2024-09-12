import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthFormBase, FormBaseComponent } from '../../components/form-base/form-base.component';
import { AuthService } from '../../../../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-professional',
  standalone: true,
  imports: [CommonModule, FormBaseComponent],
  template: `
    <app-form-base
      [isLogin]="false"
      [buttonDisabled]="false"
      (formOutput)="handleRegisterProfessionalWithEmail($event)" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterProfessionalComponent {
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  public handleRegisterProfessionalWithEmail(event: AuthFormBase): void {
    this.authService
      .registerProfessionalWithEmail(event)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          console.log(res);
          this.router.navigate(['dashboard/profile'], { state: { task: 'complete-profile' } });
        },
        error: error => {
          console.error(error);
        },
      });
  }
}
