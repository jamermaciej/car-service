import { FormControl, ValidationErrors } from '@angular/forms';

export class VinValidator {
    static checkVin(control: FormControl): ValidationErrors {
        if ( !control.value ) return null;

        // const isVinValid = /^[A-HJ-NPR-Z\d]{8}[\dX][A-HJ-NPR-Z\d]{2}\d{6}$/.test(control.value);
        const isVinValid = /^[A-Z0-9]{17}$/.test(control.value);

        return isVinValid ? null : { invalidFormat: true };
    }
}
