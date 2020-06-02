import { FormControl, ValidationErrors } from '@angular/forms';

export class RequiredValidator {
    static required(control: FormControl): ValidationErrors {
        // control.value.replace(/\s/g, '') - clear all white space, event between words
        const valueWithoutWhitespace = (control && control.value).trim();

        return !valueWithoutWhitespace.length ? { required: true } : null;
    }
}
