import { AlertService } from './../../../core/services/alert/alert-service';
import { sendEmailVerification } from './../../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { ChangeEmailComponent } from './../change-email/change-email.component';
import { ChangePasswordComponent } from './../change-password/change-password.component';
import { DeleteAccountComponent } from './../delete-account/delete-account.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './../../../shared/models/user.model';
import { UserService } from './../../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { getUser } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user$: Observable<User>;

  constructor(private dialog: MatDialog,
              private store: Store,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.user$ = this.store.select(getUser);
  }

  sendEmailVerification() {
    this.store.dispatch(sendEmailVerification());
    this.alertService.showAlert('Email verification has been send.', 'success');
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
}
