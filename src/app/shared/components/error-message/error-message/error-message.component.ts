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

  get errorMessage() {
    const controlName = this.getControlName(this.control);

    for (const key in this.control.errors) {
      if (this.control.errors.hasOwnProperty(key) && this.control.invalid && (this.control.touched || this.control.dirty)) {
        return ValidationService.getValidationMessage(controlName, key, this.control.errors[key]);
      }
    }

    return null;
  }

  getControlName(control: AbstractControl): string | null {
    const formGroup = control.parent.controls;
    return Object.keys(formGroup).find(name => formGroup[name] === control);
  }
}
