import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from './../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { LoginRoutingModule } from './login-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FirebaseModeContainerComponent } from './components/firebase-mode-container/firebase-mode-container.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { LocalizeRouterModule } from '@penleychan/ngx-transloco-router';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    FirebaseModeContainerComponent,
    ConfirmEmailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
    MatIconModule,
    MatTooltipModule,
    TranslocoModule,
    LocalizeRouterModule
  ]
})
export class LoginModule { }
