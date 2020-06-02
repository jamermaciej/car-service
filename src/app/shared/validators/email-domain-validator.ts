import { FormControl } from '@angular/forms';

export class EmailDomainValidator {
    static validateEmailDomain(domainName: string[]) {
        return (control: FormControl): { [key: string]: {} } | null => {
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
