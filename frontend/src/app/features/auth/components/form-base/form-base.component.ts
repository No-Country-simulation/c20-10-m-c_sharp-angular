import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AutoFocusModule } from 'primeng/autofocus';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

import { specialCharacterValidator, uppercaseValidator, numberValidator } from '../../validators';
import {
  ShowErrorsDirective,
  ShowErrorsPasswordDirective,
  // FocusNextDirective,
} from '../../../../shared/directives';

export interface AuthFormBase {
  email: string;
  password: string;
}

@Component({
  selector: 'app-form-base',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    AutoFocusModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ShowErrorsPasswordDirective,
    ShowErrorsDirective,
    // FocusNextDirective,
  ],
  styles: [
    `
      .c-pl {
        padding-left: 2.5rem !important;
      }
    `,
  ],
  templateUrl: './form-base.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormBaseComponent implements OnInit {
  public readonly buttonDisabled = input.required<boolean>();
  public readonly isLogin = input.required<boolean>();
  public readonly formOutput = output<AuthFormBase>();
  public readonly isSubmitted = signal<boolean>(false);

  public readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', []),
  });

  ngOnInit() {
    this.configureFormValidations();
  }

  private configureFormValidations() {
    const passwordControl = this.password;
    if (this.isLogin()) {
      passwordControl?.setValidators([Validators.required]);
    } else {
      passwordControl?.setValidators([
        Validators.required,
        Validators.minLength(8),
        specialCharacterValidator(),
        uppercaseValidator(),
        numberValidator(),
      ]);
    }
    passwordControl?.updateValueAndValidity();
  }

  public handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formValue = this.form.value as AuthFormBase;
    this.formOutput.emit(formValue);
  }

  public get email() {
    return this.form.get('email');
  }

  public get password() {
    return this.form.get('password');
  }
}
