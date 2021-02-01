import { MatInputModule } from '@angular/material/input';
import { SharedModule } from './../shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AccountdRoutingModule } from './account-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './components/account/account.component';
import { MatDividerModule } from '@angular/material/divider';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChangeEmailComponent } from './components/change-email/change-email.component';



@NgModule({
  declarations: [AccountComponent, DeleteAccountComponent, ChangePasswordComponent, ChangeEmailComponent],
  imports: [
    CommonModule,
    AccountdRoutingModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    TranslocoModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
