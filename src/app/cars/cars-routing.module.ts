import { CarsComponent } from './cars/cars.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: CarsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
