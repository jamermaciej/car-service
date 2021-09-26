import { FormControl, ValidationErrors } from '@angular/forms';

export class EmailValidator {
    static validateEmail(control: FormControl): ValidationErrors {
        const isEmailValid = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(control.value);

        return isEmailValid ? null : { email: true };
    }
}
