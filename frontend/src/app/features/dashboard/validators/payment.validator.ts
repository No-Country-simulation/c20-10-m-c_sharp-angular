import { AbstractControl, ValidationErrors } from '@angular/forms';

export function atLeastOnePaymentMethodSelected(group: AbstractControl): ValidationErrors | null {
  const methods = group.value;
  if (methods.mercadoPago || methods.creditCard || methods.cash) {
    return null;
  }
  return { atLeastOneRequired: true };
}
