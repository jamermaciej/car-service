import { FormControl, ValidationErrors } from '@angular/forms';

export class NoWhitespaceValidator {
    static checkWhitespace(control: FormControl): ValidationErrors {
        const noWhitespace = /^[^\s]+(\s+[^\s]+)*$/.test(control.value);

        return noWhitespace ? null : { whitespace: true };
    }
}
