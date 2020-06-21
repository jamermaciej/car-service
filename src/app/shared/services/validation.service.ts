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
        'required': 'Name is required.',
        'minlength': `Name must be greater than ${validatorValue.requiredLength} characters.`,
        'maxlength': `Name must be less than ${validatorValue.requiredLength} characters.`
      },
      'email': {
        'required': 'Email is required.',
        'email': 'Invalid email address.',
        'emailDomain': `We accept only ${validatorValue.acceptDomain && validatorValue.acceptDomain.join(', ')} domain.`
      },
      'password': {
        'required': 'Password is required.',
        'minlength': `Password must be greater than ${validatorValue.requiredLength} characters.`,
        'noUppercase': 'Password must contain at least uppercase letter.',
        'noLowercase': 'Password must contain at least one lowercase letter.',
        'noNumber': 'Password must contain at least one number.',
        'noAplhanumberic': 'Password must contain at least one special character.',
        'whitespace': 'Password has white space on start or end.'
      },
      'confirmPassword': {
        'required': 'Repeat password.',
        'passwordMismatch': 'Passwords must be the same.'
      },
      'terms': {
        'required': 'Accept terms of service is required.'
      }
    };

    return messages[control][validator];
  }
}

