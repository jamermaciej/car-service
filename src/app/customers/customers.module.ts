import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { AddCustomerModalComponent } from './components/add-customer-modal/add-customer-modal.component';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [CustomersComponent, AddCustomerModalComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CustomersModule { }
