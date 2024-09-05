import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { numberValidator } from '../../validators/number.validator';
import { specialCharacterValidator } from '../../validators/special-character.validator';
import { uppercaseValidator } from '../../validators/uppercase.validator';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

export interface AuthFormBase {
  email: string;
  password: string;
}

@Component({
  selector: 'app-form-base',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
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
  public readonly isLogin = input.required<boolean>();
  public readonly formOutput = output<AuthFormBase>();
  // public readonly isSubmitted = signal<boolean>(true);

  public readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', []),
  });

  ngOnInit() {
    this.configureFormValidations();
  }

  private configureFormValidations() {
    const passwordControl = this.form.get('password');
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
    // this.isSubmitted.set(true);z
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
