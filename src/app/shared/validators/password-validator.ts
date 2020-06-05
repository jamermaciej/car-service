import { FormControl, ValidationErrors, FormGroup } from '@angular/forms';

export class PasswordValidator {
    static matchPassword(formGroup: FormGroup) {
        const password = formGroup.get('password');
        const confirmPassword = formGroup.get('confirmPassword');

        if (confirmPassword.errors && !confirmPassword.errors.passwordMismatch) return;

        password && confirmPassword && password.value !== confirmPassword.value ?
            confirmPassword.setErrors({ passwordMismatch: true }) :
            confirmPassword.setErrors(null);
    }

    static validatePassword(control: FormControl): ValidationErrors {
        let errors = null;
        if (!(/[A-Z]/g.test(control.value))) {
            errors = {
                ...errors,
                noUppercase: true
            };
        }
        if (!(/[a-z]/g.test(control.value))) {
            errors = {
                ...errors,
                noLowercase: true
            };
        }
        if (!(/[0-9]/g.test(control.value))) {
            errors = {
                ...errors,
                noNumber: true
            };
        }
        if (!(/[^a-zA-Z0-9]/g.test(control.value))) {
            errors = {
                ...errors,
                noAplhanumberic: true
            };
        }
        return errors;
    }

    static hasUppercase(control: FormControl): ValidationErrors {
        return /[A-Z]/g.test(control.value) ? null : { noUppercase: true };
    }

    static hasLowecase(control: FormControl): ValidationErrors {
        return /[a-z]/g.test(control.value) ? null : { noLowercase: true };
    }

    static hasNumber(control: FormControl): ValidationErrors {
        return /[0-9]/g.test(control.value) ? null : { noNumber: true };
    }

    static hasNonAlphanumeric(control: FormControl): ValidationErrors {
        return /[^a-zA-Z0-9]/g.test(control.value) ? null : { noAplhanumberic: true };
    }
}
