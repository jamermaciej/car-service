import { TranslocoModule } from '@ngneat/transloco';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from './../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OrdersRoutingModule } from './orders-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './components/orders/orders.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDateFormats, MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { MatDayjsDateModule, MAT_DAYJS_DATE_ADAPTER_OPTIONS } from '@tabuckner/material-dayjs-adapter';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { LocalizeRouterModule } from '@penleychan/ngx-transloco-router';
import { ModalContainerComponent } from './components/modal-container/modal-container.component';

/**
 * Custom Date-Formats and Adapter (using https://github.com/iamkun/dayjs)
 */
export const MAT_DAYJS_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@NgModule({
  declarations: [OrdersComponent, AddOrderComponent, EditOrderComponent, ModalContainerComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule,
    TranslocoModule,
    MatDayjsDateModule,
    TranslocoLocaleModule,
    LocalizeRouterModule
  ],
  providers: [
    {
      provide: MAT_DAYJS_DATE_ADAPTER_OPTIONS,
      useValue: { useUtc: true }
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_DAYJS_DATE_FORMATS
    }
  ]
})
export class OrdersModule { }
