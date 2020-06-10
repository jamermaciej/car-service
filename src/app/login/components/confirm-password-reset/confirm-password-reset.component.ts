import { UserService } from './../../../core/services/user/user.service';
import { RequiredValidator } from './../../../shared/validators/required-validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NoWhitespaceValidator } from 'src/app/shared/validators/no-whitespace-validator';
import { PasswordValidator } from 'src/app/shared/validators/password-validator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.component.html',
  styleUrls: ['./confirm-password-reset.component.scss']
})
export class ConfirmPasswordResetComponent implements OnInit {
  newPasswordForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.newPasswordForm = this.fb.group({
      password: ['',
        [
          RequiredValidator.required,
          Validators.minLength(8),
          NoWhitespaceValidator.checkWhitespace,
          PasswordValidator.validatePassword]
        ],
      confirmPassword: ['', RequiredValidator.required],
    });
  }

  onSubmit() {
    if (this.newPasswordForm.valid) {
      const code = this.activatedRoute.snapshot.queryParams['oobCode'];
      const { password } = this.newPasswordForm.value;
      this.userService.updatePassword(code, password);
    } else {
      this.newPasswordForm.markAllAsTouched();
    }
  }
}
