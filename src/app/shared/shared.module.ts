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
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { MatSelectModule } from '@angular/material/select';
import { LocalizeRouterModule } from '@penleychan/ngx-transloco-router';
import { RouterModule } from '@angular/router';
import { CarServiceTableModule } from './car-service-table/car-service-table.module';
import { OrdersAmountComponent } from './components/orders-amount/orders-amount.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';

@NgModule({
  declarations: [
    ErrorMessageComponent,
    HintComponent,
    LogoComponent,
    AddCustomerFormComponent,
    AddCarFormComponent,
    StatusFormComponent,
    OrdersAmountComponent,
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
    TranslocoLocaleModule,
    MatSelectModule,
    LocalizeRouterModule,
    RouterModule,
    ScheduleModule
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
    CarServiceTableModule,
    OrdersAmountComponent,
    ScheduleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class SharedModule {}
