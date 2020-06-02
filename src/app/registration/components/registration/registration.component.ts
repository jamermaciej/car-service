import { PasswordValidator } from './../../../shared/validators/password-validator';
import { EmailDomainValidator } from './../../../shared/validators/email-domain-validator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { emailDomain } from '../../../../assets/config.json';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email, EmailDomainValidator.validateEmailDomain(emailDomain)]],
      passwordGroup: this.formBuilder.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, { validator: PasswordValidator.validatePassword }),
      terms: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log(this.registrationForm);
  }
}
