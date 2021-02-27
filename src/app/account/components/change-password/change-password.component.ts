import { changePassword } from './../../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user/user.service';
import * as fromRoot from './../../../store/reducers';
import { PasswordValidator } from 'src/app/shared/validators/password-validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePassword: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private dialogRef: MatDialogRef<ChangePasswordComponent>,
              private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.changePassword = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]]
    }, { validator: PasswordValidator.differentPasswords });
  }

  onSubmit() {
    const { oldPassword, newPassword } = this.changePassword.value;
    this.store.dispatch(changePassword({ oldPassword, newPassword }));
    this.dialogRef.close();
  }
}
