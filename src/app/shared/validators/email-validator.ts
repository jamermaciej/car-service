import { FormControl, ValidationErrors } from '@angular/forms';

export class EmailValidator {
    static matchEmailDomain(domainName: string[]) {
        return (control: FormControl): ValidationErrors => {
            const email = control.value;
            const domain = email.substring(email.lastIndexOf('@') + 1);
            for (const d of domainName) {
                if (domain.toLowerCase() === d.toLowerCase()) return null;
            }
            return {
                emailDomain: {
                    domain,
                    acceptDomain: domainName
                }
            };
        };
    }
}
