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
        'required': 'car.error.brand.required',
      },
      'model': {
        'required': 'car.error.model.required',
      },
      'type': {
        'required': 'car.error.type.required',
      },
      'year': {
        'required': 'car.error.year.required',
      },
      'label': {
        'required': 'customer.error.label.required',
      },
      'value': {
        'required': 'customer.error.value.required',
      },
      'registration': {
        'required': 'car.error.registration.required',
        'minlength': 'car.error.registration.minLength',
        'maxlength': 'car.error.registration.maxLength',
      },
      'vin': {
        'required': 'car.error.vin.required',
        'invalidFormat': 'car.error.vin.invalidFormat'
      },
      'mileage': {
        'required': 'car.error.mileage.required',
      },
      'capacity': {
        'required': 'car.error.capacity.required',
      },
      'power': {
        'required': 'car.error.power.required',
      },
      'fuel': {
        'required': 'car.error.fuel.required',
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
      'passwordConfirm': {
        'required': 'register.error.confirm_password.required',
        'passwordMismatch': 'register.error.confirm_password.password_mismatch'
      },
      'terms': {
        'required': 'register.error.terms.required'
      },
      'newPassword': {
        'samePasswords': 'account.change_password.error.new_password.same_passwords'
      },
      'customer': {
        'required': 'orders.error.customer.required'
      },
      'car': {
        'required': 'orders.error.car.required'
      },
      'user': {
        'required': 'orders.error.worker.required'
      },
      'subject': {
        'required': 'contact.error.subject.required'
      },
      'message': {
        'required': 'contact.error.message.required'
      },
      'receiverType': {
        'required': 'contact.error.message.required'
      },
      'receivers': {
        'required': 'contact.error.message.required'
      }
    };

    return messages[control][validator];
  }
}

