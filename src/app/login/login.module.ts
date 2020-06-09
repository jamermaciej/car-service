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



@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SharedModule
  ]
})
export class LoginModule { }
