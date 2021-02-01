import { ChangeEmailComponent } from './../change-email/change-email.component';
import { ChangePasswordComponent } from './../change-password/change-password.component';
import { DeleteAccountComponent } from './../delete-account/delete-account.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './../../../shared/models/user.model';
import { UserService } from './../../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user$: Observable<User>;

  constructor(private userService: UserService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.user$ = this.userService.user$;
  }

  async sendEmailVerification() {
    await this.userService.sendEmailVerification();
    this.snackBar.open('Email verification has been send.', '', {
      duration: 15000,
      panelClass: 'success'
    });
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