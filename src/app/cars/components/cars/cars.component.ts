import { FlowRoutes } from 'src/app/core/enums/flow';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Car } from 'src/app/shared/models/car.model';
import * as fromCars from '../../store';
import { removeCar } from '../../store';
import { getCars } from '../../store/selectors/cars.selectors';
import { TableColumn } from 'src/app/shared/car-service-table/models/table-column.model';
import { TableColumnType } from 'src/app/core/enums/table-column-type';
import { LocalizeRouterService } from '@penleychan/ngx-transloco-router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {
  flowRoutes = FlowRoutes;
  cars$: Observable<Car[]>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: TableColumn[];
  cars: Car[];

  constructor(private store: Store<fromCars.State>,
              private router: Router,
              private localize: LocalizeRouterService
            ) {}

  ngOnInit(): void {
    this.store
      .select(getCars)
      .pipe(filter((data) => !!data))
      .subscribe((cars) => {
        this.cars = cars;
      });

    this.displayedColumns = [
        {
          name: 'car.table.headers.id',
          dataKey: ['id'],
          position: 'left',
          isSortable: true,
          type: TableColumnType.TEXT
        },
        {
          name: 'car.table.headers.brand',
          dataKey: ['brand'],
          position: 'right',
          isSortable: false,
          type: TableColumnType.TEXT
        },
        {
          name: 'car.table.headers.model',
          dataKey: ['model'],
          position: 'right',
          isSortable: false,
          type: TableColumnType.TEXT
        },
        {
          name: 'car.table.headers.type',
          dataKey: ['type'],
          position: 'right',
          isSortable: false,
          type: TableColumnType.TEXT
        },
        {
          name: 'car.table.headers.year',
          dataKey: ['year'],
          position: 'right',
          isSortable: false,
          type: TableColumnType.TEXT
        },
        {
          name: 'car.table.headers.registration',
          dataKey: ['registration'],
          position: 'right',
          isSortable: true,
          type: TableColumnType.TEXT
        },
        {
          name: 'car.table.headers.fuel',
          dataKey: ['fuel'],
          position: 'right',
          isSortable: false,
          type: TableColumnType.TEXT,
        },
        {
          position: 'right',
          type: TableColumnType.ACTION
        },
      ];
  }

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    const carsCopy = [...this.cars];
    if (sortParameters.direction === 'asc') {
      this.cars = carsCopy.sort((a: Car, b: Car) => {
        if (a[keyName] >= b[keyName]) {
          return 1;
        } else {
          return -1;
        }
      });
    } else if (sortParameters.direction === 'desc') {
      this.cars = carsCopy.sort((a: Car, b: Car) => {
        if (a[keyName] <= b[keyName]) {
          return 1;
        } else {
          return -1;
        }
      });
    } else {
      return this.cars;
    }
  }

  removeCar(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.store.dispatch(removeCar({ id }));
  }

  editCar(event: MouseEvent, id: number) {
    const translatedRoute = this.localize.translateRoute([this.flowRoutes.CARS, id]);
    this.router.navigate([...translatedRoute]);
  }
}
