import { Location } from '@angular/common';
import { UserService } from './../../../core/services/user/user.service';
import { RequiredValidator } from './../../../shared/validators/required-validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { sendPasswordResetEmail } from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private location: Location,
              private store: Store) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [RequiredValidator.required, Validators.email]]
    });
  }

  onSubmit() {
    const email = this.forgotPasswordForm.value;
    // this.userService.sendPasswordResetEmail(email);
    this.store.dispatch(sendPasswordResetEmail(email));
  }

  goBack() {
    this.location.back();
  }
}
