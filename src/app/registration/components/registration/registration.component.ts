import { RegisterData } from './../../../shared/models/register-data.model';
import { Store } from '@ngrx/store';
import { FlowRoutes } from './../../../core/enums/flow';
import { UserService } from './../../../core/services/user/user.service';
import { NoWhitespaceValidator } from './../../../shared/validators/no-whitespace-validator';
import { RequiredValidator } from './../../../shared/validators/required-validator';
import { PasswordValidator } from './../../../shared/validators/password-validator';
import { EmailValidator } from './../../../shared/validators/email-validator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { emailDomain } from '../../../../assets/config.json';
import { Platform } from '@angular/cdk/platform';
import { register } from '../../../store/actions';

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
  flowRoutes = FlowRoutes;
  isMobile: boolean;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private platform: Platform,
              private store: Store) {
    this.isMobile = this.platform.ANDROID || this.platform.IOS;
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [RequiredValidator.required, Validators.email, EmailValidator.matchEmailDomain(emailDomain)]],
      password: ['',
        [
          RequiredValidator.required,
          Validators.minLength(8),
          NoWhitespaceValidator.checkWhitespace,
          PasswordValidator.validatePassword]
        ],
      confirmPassword: ['', RequiredValidator.required],
      terms: ['', [Validators.requiredTrue]]
    }, { validator: PasswordValidator.matchPassword });
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
      const { name, email, password } = this.registrationForm.value;
      const registerData: RegisterData = {
        name,
        email,
        password
      };
      this.store.dispatch(register(registerData));
    } else {
      // alternative for validateAllFormFields, markAllAsTouched mark form as toutch too
      this.registrationForm.markAllAsTouched();
      console.log(this.registrationForm);
    }
  }

  signInWithGoogle() {
    this.userService.signInWithGoogle();
  }
}
