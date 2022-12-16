import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  @Input() control: FormControl | FormGroup;
  @Input() controlName: string;
  params: {};

  get errorMessage() {
    const controlName = this.getControlName(this.control);

    for (const key in this.control?.errors) {
      if (this.control.errors.hasOwnProperty(key) && this.control.invalid && this.control.touched) {
        switch (key) {
          case 'emailDomain':
            this.params = {
              domain: this.control.errors[key].acceptDomain
            };
            break;
          case 'minlength':
            this.params = {
              requiredLength: this.control.errors[key].requiredLength
            };
            break;
          case 'maxlength':
            this.params = {
              requiredLength: this.control.errors[key].requiredLength
            };
            break;
        }
        return ValidationService.getValidationMessage(controlName, key, this.control.errors[key]);
      }
    }



    return null;
  }

  getControlName(control: AbstractControl): string | null {
    const formGroup = control?.parent?.controls;
    return formGroup ? Object.keys(formGroup).find(name => formGroup[name] === control) : null;
  }
}
