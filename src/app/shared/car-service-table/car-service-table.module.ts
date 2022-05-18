import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarServiceTableComponent } from './car-service-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { TranslocoModule } from '@ngneat/transloco';
import { DataPropertyGetterPipe } from '../data-property-getter.pipe';
import { MatSelectModule } from '@angular/material/select';
import { CheckmarkComponent } from '../components/checkmark/checkmark.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableFiltersComponent } from './table-filters/table-filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActiveFiltersComponent } from './table-filters/active-filters/active-filters.component';



@NgModule({
  declarations: [CarServiceTableComponent, DataPropertyGetterPipe, CheckmarkComponent, TableFiltersComponent, ActiveFiltersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    TranslocoModule,
    TranslocoLocaleModule
  ],
  exports: [
    CarServiceTableComponent,
    CheckmarkComponent
  ]
})
export class CarServiceTableModule { }
