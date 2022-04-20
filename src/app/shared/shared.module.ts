import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './components/error-message/error-message/error-message.component';
import { HintComponent } from './components/hint/hint/hint.component';
import { LogoComponent } from './components/logo/logo.component';
import { TranslocoModule } from '@ngneat/transloco';
import { AddCustomerFormComponent } from './components/customers/add-customer-form/add-customer-form.component';
import { MatInputModule } from '@angular/material/input';
import { AddCarFormComponent } from './components/cars/add-customer-form/add-customer-car.component';
import { StatusFormComponent } from './components/statuses/status-form/status-form.component';
import { MatOptionModule } from '@angular/material/core';
import { CarServiceTableComponent } from './components/car-service-table/car-service-table.component';
import { DataPropertyGetterPipe } from './data-property-getter.pipe';

@NgModule({
  declarations: [
    ErrorMessageComponent,
    HintComponent,
    LogoComponent,
    AddCustomerFormComponent,
    AddCarFormComponent,
    StatusFormComponent,
    CarServiceTableComponent,
    DataPropertyGetterPipe,
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ErrorMessageComponent,
    HintComponent,
    LogoComponent,
    AddCustomerFormComponent,
    AddCarFormComponent,
    StatusFormComponent,
    TranslocoModule,
    CarServiceTableComponent,
  ],
})
export class SharedModule {}
