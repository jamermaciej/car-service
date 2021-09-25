import { FormControl, ValidationErrors } from '@angular/forms';

export class PhoneNumberValidator {
    static checkPhoneNumber(control: FormControl): ValidationErrors {
        const isNumberValid = /^[0-9\ +]*$/.test(control.value);

        return isNumberValid ? null : { invalidPhoneNumber: true };
    }
}
