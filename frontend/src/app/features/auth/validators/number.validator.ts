import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const hasNumber = /[0-9]/.test(control.value);
    return hasNumber ? null : { number: true };
  };
}
