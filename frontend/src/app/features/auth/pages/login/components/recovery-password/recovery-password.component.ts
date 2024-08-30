import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf, NgStyle } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../../../shared/services/validators.service';

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [
    InputTextModule,
    NgIf,
    ReactiveFormsModule,
    NgStyle,
  ],
  templateUrl: './recovery-password.component.html',
  styles: []
})
export class RecoveryPasswordComponent implements OnInit {
  @Output() formValid = new EventEmitter<boolean>();
  @Output() emailValue = new EventEmitter<string>();

  private fb = inject(FormBuilder);
  validatorService = inject(ValidatorsService);

  myForm: FormGroup = this.fb.group({
    email_recover_password: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
  });

  ngOnInit() {
    this.myForm.statusChanges.subscribe(() => {
      this.formValid.emit(this.myForm.valid);

      if (this.myForm.valid) {
        this.emailValue.emit(this.myForm.get('email_recover_password')?.value);
      }
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  }

}
