import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsRoutingModule } from './cars-routing.module';
import { AddCarModalComponent } from './components/add-car-modal/add-car-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CarsComponent } from './components/cars/cars.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslocoModule } from '@ngneat/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [CarsComponent, AddCarModalComponent],
  imports: [
    CommonModule,
    CarsRoutingModule,
    MatDialogModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    TranslocoModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
  ],
})
export class CarsModule {}
