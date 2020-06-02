import { FormControl } from '@angular/forms';


export class NoWhitespaceValidator {
    static validateNoWhitespace(control: FormControl): {[key: string]: boolean} | null {
        const isWhitespace = !((control && control.value || '').trim().length);
        return !isWhitespace ? null : { whitespace: true };
    }
}
