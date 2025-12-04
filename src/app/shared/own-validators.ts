import { AbstractControl, ValidationErrors } from '@angular/forms';

export function notTestValidator(control: AbstractControl): ValidationErrors | null {
  const forbidden = control.value?.trim().toLowerCase() === 'test' || 'TEST' || 'Test';
  return forbidden ? { forbiddenWord: true } : null;
}