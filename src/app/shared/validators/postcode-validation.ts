import { FormControl, ValidationErrors } from '@angular/forms';

export class PostcodeValidator {
    static checkPostcode(control: FormControl): ValidationErrors {
        const isPostcodeValid = /^[0-9]{2}-[0-9]{3}$/.test(control.value);

        return isPostcodeValid ? null : { invalidPostcode: true };
    }
}
