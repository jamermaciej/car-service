import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Car } from 'src/app/shared/models/car.model';
import * as fromCars from '../../store';
import { removeCar } from '../../store';
import { getCars } from '../../store/selectors/cars.selectors';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit, AfterViewInit {
  cars$: Observable<Car[]>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns = [
    'id',
    'brand',
    'model',
    'type',
    'year',
    'registration',
    'fuel',
    'actions',
  ];
  cars = new MatTableDataSource<Car>();

  constructor(private store: Store<fromCars.State>) {}

  ngOnInit(): void {
    // this.cars$ = this.store.select(getCars).pipe(filter((data) => !!data));
    this.store
      .select(getCars)
      .pipe(filter((data) => !!data))
      .subscribe((cars) => {
        this.cars.data = cars;
      });
  }

  ngAfterViewInit() {
    this.cars.sort = this.sort;
    this.cars.paginator = this.paginator;
  }

  removeCar(car: Car, event: MouseEvent) {
    event.stopPropagation();
    this.store.dispatch(removeCar({ car }));
  }
}
