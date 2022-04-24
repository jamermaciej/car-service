import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { TranslocoModule } from '@ngneat/transloco';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from './../shared/shared.module';
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
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { LocalizeRouterModule } from '@penleychan/ngx-transloco-router';

@NgModule({
  declarations: [
    CustomersComponent,
    AddCustomerModalComponent,
    EditCustomerComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule,
    MatIconModule,
    TranslocoModule,
    MatCardModule,
    MatAutocompleteModule,
    LocalizeRouterModule
  ],
})
export class CustomersModule {}
