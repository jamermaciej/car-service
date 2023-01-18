import { updatePassword } from './../../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { UserService } from './../../../core/services/user/user.service';
import { RequiredValidator } from './../../../shared/validators/required-validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NoWhitespaceValidator } from 'src/app/shared/validators/no-whitespace-validator';
import { ActivatedRoute } from '@angular/router';
import * as fromRoot from './../../../store/reducers';
import { PasswordValidator } from 'src/app/shared/validators/password-validator';

@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.component.html',
  styleUrls: ['./confirm-password-reset.component.scss']
})
export class ConfirmPasswordResetComponent implements OnInit {
  newPasswordForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.newPasswordForm = this.fb.group({
      password: ['',
        [
          RequiredValidator.required,
          Validators.minLength(8),
          NoWhitespaceValidator.checkWhitespace,
          PasswordValidator.validatePassword]
        ],
      passwordConfirm: ['', RequiredValidator.required],
    }, {
      validator: PasswordValidator.matchPassword
    });
  }

  onSubmit() {
    if (this.newPasswordForm.valid) {
      const token = this.activatedRoute.snapshot.params['token'];
      const { password, passwordConfirm } = this.newPasswordForm.value;
      this.store.dispatch(updatePassword({ token, password, passwordConfirm }));
    } else {
      this.newPasswordForm.markAllAsTouched();
    }
  }
}
