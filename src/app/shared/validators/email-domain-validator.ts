import { FormControl } from '@angular/forms';

export class EmailDomainValidator {
    static validateEmailDomain(domainName: string) {
        return (control: FormControl): { [key: string]: {} } | null => {
            const email = control.value;
            const domain = email.substring(email.lastIndexOf('@') + 1);
            if (domain.toLowerCase() !== domainName.toLowerCase()) {
                const domainError = {
                    domain,
                    acceptDomain: domainName
                };
                return {
                    emailDomain: { ...domainError }
                };
            }
            return null;
        };
    }
}
