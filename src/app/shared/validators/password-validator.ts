import { FormControl, ValidationErrors } from '@angular/forms';

export class PasswordValidator {
    static matchPassword(control: FormControl): ValidationErrors {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
        if (password.pristine || confirmPassword.pristine) {
            return null;
        }
        return password && confirmPassword && password.value !== confirmPassword.value ?
            { passwordMismatch: true } :
            null;
    }

    static validatePassword(control: FormControl): ValidationErrors {
        const isValid = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(control.value);
        return isValid ? null : { invalid: true };
    }
}
