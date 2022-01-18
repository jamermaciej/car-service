import { EditCarComponent } from './components/cars/edit-car/edit-car.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './components/cars/cars.component';

const routes: Routes = [
  {
    path: '',
    component: CarsComponent,
  },
  {
    path: ':id',
    component: EditCarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarsRoutingModule {}
