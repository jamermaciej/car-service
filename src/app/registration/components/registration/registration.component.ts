import { UserService } from './../../../core/services/user/user.service';
import { NoWhitespaceValidator } from './../../../shared/validators/no-whitespace-validator';
import { RequiredValidator } from './../../../shared/validators/required-validator';
import { PasswordValidator } from './../../../shared/validators/password-validator';
import { EmailValidator } from './../../../shared/validators/email-validator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { emailDomain } from '../../../../assets/config.json';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  hidePassword = true;
  hideConfirmPassword = true;
  registrationForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [RequiredValidator.required, Validators.email, EmailValidator.matchEmailDomain(emailDomain)]],
      passwordGroup: this.formBuilder.group({
        password: ['',
        [
          RequiredValidator.required,
          Validators.minLength(8),
          NoWhitespaceValidator.checkWhitespace,
          PasswordValidator.validatePassword]
        ],
        confirmPassword: ['', RequiredValidator.required]
      }, { validator: PasswordValidator.matchPassword }),
      terms: ['', [Validators.requiredTrue]]
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.valid) {
      this.userService.register(this.registrationForm.value);
    } else {
      // alternative for validateAllFormFields, markAllAsTouched mark form as toutch too
      this.registrationForm.markAllAsTouched();
      console.log(this.registrationForm);
    }
  }
}
