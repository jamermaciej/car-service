import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsRoutingModule } from './cars-routing.module';
import { AddCarModalComponent } from './components/add-car-modal/add-car-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CarsComponent } from './components/cars/cars.component';



@NgModule({
  declarations: [CarsComponent, AddCarModalComponent],
  imports: [
    CommonModule,
    CarsRoutingModule,
    MatDialogModule,
    SharedModule
  ]
})
export class CarsModule { }
