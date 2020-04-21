import { MatFormFieldModule } from '@angular/material/form-field';
import { RegistrationRoutingModule } from './registration-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './components/registration/registration.component';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class RegistrationModule { }
