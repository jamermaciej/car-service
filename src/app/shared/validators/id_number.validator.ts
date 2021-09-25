import { FormControl, ValidationErrors } from '@angular/forms';

export class IdNumberValidator {
    static checkIdNumber(control: FormControl): ValidationErrors {
        const idNumber = control.value;
        const isIdNumberValid = /^[A-Z]{3}[0-9]{6}$/.test(idNumber);

        let checkDigit = 0;

        if ( isIdNumberValid ) {
            checkDigit = 7 * IdNumberValidator.getLetterValue(idNumber[0]) +
            3 * IdNumberValidator.getLetterValue(idNumber[1]) +
            1 * IdNumberValidator.getLetterValue(idNumber[2]) +
            7 * IdNumberValidator.getLetterValue(idNumber[4]) +
            3 * IdNumberValidator.getLetterValue(idNumber[5]) +
            1 * IdNumberValidator.getLetterValue(idNumber[6]) +
            7 * IdNumberValidator.getLetterValue(idNumber[7]) +
            3 * IdNumberValidator.getLetterValue(idNumber[8]);

            checkDigit %= 10;
            const isControlDigitValid = checkDigit === IdNumberValidator.getLetterValue(idNumber[3]);

            return isControlDigitValid ? null : { invalidIdNumber: true };
        }

        return isIdNumberValid ? null : { invalidIdNumber: true };
    }


    static getLetterValue(letter: string)  {
        const letterValues = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
            'U', 'V', 'W', 'X', 'Y', 'Z'
        ];

        for (let i = 0; i < letterValues.length; i++) {
            if (letter === letterValues[i]) return i;
        }
        return -1;
    }
}
