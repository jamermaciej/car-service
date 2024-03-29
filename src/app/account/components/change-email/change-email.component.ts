import { Store } from '@ngrx/store';
import { RequiredValidator } from './../../../shared/validators/required-validator';
import { EmailDomainValidator } from '../../../shared/validators/email-domain-validator';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import config from '../../../../assets/config.json';
import { MatDialogRef } from '@angular/material/dialog';
import { updateEmail } from 'src/app/store';
import * as fromRoot from './../../../store/reducers';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  changeEmail: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<ChangeEmailComponent>,
              private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.changeEmail = this.formBuilder.group({
      password: ['', [Validators.required]],
      email: ['', [RequiredValidator.required, Validators.email, EmailDomainValidator.matchEmailDomain(config.emailDomain)]]
    });
  }

  onSubmit() {
    const { password, email } = this.changeEmail.value;
    this.store.dispatch(updateEmail({ password, email }));
    this.dialogRef.close();
  }
}
