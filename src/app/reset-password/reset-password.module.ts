import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmPasswordResetComponent } from './components/confirm-password-reset/confirm-password-reset.component';
import { SharedModule } from '../shared/shared.module';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';

@NgModule({
  declarations: [ConfirmPasswordResetComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    SharedModule
  ]
})
export class ResetPasswordModule { }
