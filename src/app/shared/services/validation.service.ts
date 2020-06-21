import { TranslocoService } from '@ngneat/transloco';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor(private translocoService: TranslocoService) {}

  static getValidationMessage(control: string, validator: string, validatorValue?: any) {
    const messages = {
      'name': {
        'required': 'register.error.name.required',
        'minlength': `register.error.name.minLength`,
        'maxlength': `register.error.name.maxLength`
      },
      'email': {
        'required': 'register.error.email.required',
        'email': 'register.error.email.invalid',
        'emailDomain': `register.error.email.domain`
      },
      'password': {
        'required': 'register.error.password.required',
        'minlength': `register.error.password.minLength`,
        'noUppercase': 'register.error.password.noUppercase',
        'noLowercase': 'register.error.password.noLowercase',
        'noNumber': 'register.error.password.noNumber',
        'noAplhanumberic': 'register.error.password.noAlphanumeric',
        'whitespace': 'register.error.password.whitespace'
      },
      'confirmPassword': {
        'required': 'register.error.confirm_password.required',
        'passwordMismatch': 'register.error.confirm_password.password_mismatch'
      },
      'terms': {
        'required': 'register.error.terms.required'
      }
    };

    return messages[control][validator];
  }
}

