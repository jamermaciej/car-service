import { UserService } from './../../../core/services/user/user.service';
import { RequiredValidator } from './../../../shared/validators/required-validator';
import { EmailValidator } from './../../../shared/validators/email-validator';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailDomain } from '../../../../assets/config.json';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  changeEmail: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private dialogRef: MatDialogRef<ChangeEmailComponent>) { }

  ngOnInit(): void {
    this.changeEmail = this.formBuilder.group({
      password: ['', [Validators.required]],
      email: ['', [RequiredValidator.required, Validators.email, EmailValidator.matchEmailDomain(emailDomain)]]
    });
  }

  onSubmit() {
    const { password, email } = this.changeEmail.value;
    this.userService.updateEmail(password, email);
    this.dialogRef.close();
  }
}