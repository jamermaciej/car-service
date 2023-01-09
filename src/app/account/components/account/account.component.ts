import { TranslocoService } from '@ngneat/transloco';
import { AlertService } from './../../../core/services/alert/alert-service';
import { sendEmailVerification } from './../../../store/actions/auth.actions';
import { ChangeEmailComponent } from './../change-email/change-email.component';
import { ChangePasswordComponent } from './../change-password/change-password.component';
import { DeleteAccountComponent } from './../delete-account/delete-account.component';
import { User } from './../../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { getUser } from 'src/app/store/selectors/auth.selectors';
import * as fromRoot from './../../../store/reducers';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user$: Observable<User>;
  email: string;

  constructor(private dialog: MatDialog,
              private store: Store<fromRoot.State>,
              private alertService: AlertService,
              private translocoService: TranslocoService) { }

  ngOnInit(): void {
    this.user$ = this.store.select(getUser).pipe(
      tap((user: User) => this.email = user.email)
    );
  }

  sendEmailVerification() {
    this.store.dispatch(sendEmailVerification({ email: this.email }));
    const successMessage = this.translocoService.translate('account.message.success.verify_email');
    this.alertService.showAlert(successMessage, 'success');
  }

  changeEmail() {
    this.dialog.open(ChangeEmailComponent, {
      panelClass: 'change-email-dialog',
      autoFocus: false
    });
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent, {
      panelClass: 'change-password-dialog',
      autoFocus: false
    });
  }

  deleteAccount() {
    this.dialog.open(DeleteAccountComponent, {
      panelClass: 'delete-account-dialog',
      autoFocus: false
    });
  }

  emailStatus(status: boolean) {
    return status ? 'account.subheader.verify_email.verified' : 'account.subheader.verify_email.unverified';
  }
}
