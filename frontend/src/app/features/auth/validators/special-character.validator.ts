import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function specialCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
    return hasSpecialChar ? null : { specialCharacter: true };
  };
}
