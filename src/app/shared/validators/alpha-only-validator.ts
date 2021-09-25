import { FormControl, ValidationErrors } from '@angular/forms';

export class AlphaOnlyValidator {
    static alphaOnly(control: FormControl): ValidationErrors {
        const onlyAlpha = /^[a-zA-Z]+$/.test(control.value);

        return onlyAlpha ? null : { onlyAlpha: true };
    }
}
