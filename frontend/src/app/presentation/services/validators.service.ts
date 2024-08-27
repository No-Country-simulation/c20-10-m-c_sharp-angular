import { Injectable } from '@angular/core';
import {AbstractControl, FormGroup, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  notBlankPattern: string = '^\s*\S.*\S\s*$';

  isValidField(myForm: FormGroup, field: string): boolean | null {
    return myForm.controls[field].errors && myForm.controls[field].touched;
  }

  isFieldOneEqualToFieldTwo(field1: string, field2: string) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {
      const pass1 = formGroup.get(field1)?.value;
      const pass2 = formGroup.get(field2)?.value;

      if ( pass1 !== pass2 ) {
        formGroup.get(field2)?.setErrors({ noEqual: true });
        return { noEqual: true };
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }

  }

  getFieldError(myForm: FormGroup, field: string): string | null {

    if ( !myForm.controls[field] ) return null;

    const errors = myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return 'El valor mínimo es 0';
        case 'pattern':
          return field === 'email' ? 'Ingrese un email válido' : 'El campo no es válido';
        case 'noEqual':
          return 'Las contraseñas no coinciden';
        default:
          return 'Error desconocido';
      }
    }

    return null;
  }

}
