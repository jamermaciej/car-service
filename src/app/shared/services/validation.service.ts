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
        'maxlength': `register.error.name.maxLength`,
        'onlyAlpha': 'customer.error.name.onlyAlpha'
      },
      'surname': {
        'required': 'customer.error.surname.required',
        'onlyAlpha': 'customer.error.surname.onlyAlpha'
      },
      'phoneNumber': {
        'required': 'customer.error.phoneNumber.required',
        'invalidPhoneNumber': 'customer.error.phoneNumber.invalidPhoneNumber'
      },
      'idNumber': {
        'required': 'customer.error.idNumber.required',
        'invalidIdNumber': 'customer.error.idNumber.invalidIdNumber'
      },
      'postcode': {
        'invalidPostcode': 'customer.error.postcode.invalidPostcode'
      },
      'brand': {
        'required': 'customer.error.brand.required',
      },
      'model': {
        'required': 'customer.error.model.required',
      },
      'type': {
        'required': 'customer.error.type.required',
      },
      'year': {
        'required': 'customer.error.year.required',
      },
      'label': {
        'required': 'customer.error.label.required',
      },
      'value': {
        'required': 'customer.error.value.required',
      },
      'registration': {
        'required': 'customer.error.registration.required',
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
      },
      'newPassword': {
        'samePasswords': 'account.change_password.error.new_password.same_passwords'
      }
    };

    return messages[control][validator];
  }
}

