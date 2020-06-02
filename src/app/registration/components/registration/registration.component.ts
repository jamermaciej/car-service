import { RequiredValidator } from './../../../shared/validators/required-validator';
import { PasswordValidator } from './../../../shared/validators/password-validator';
import { EmailValidator } from './../../../shared/validators/email-validator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', [RequiredValidator.required, Validators.minLength(2), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email, EmailValidator.matchEmailDomain(emailDomain)]],
      passwordGroup: this.formBuilder.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', Validators.required]
      }, { validator: PasswordValidator.matchPassword }),
      terms: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log(this.registrationForm);
  }
}
