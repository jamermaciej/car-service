import { updateCarFailure } from './../actions/cars.actions';
import { updateOrderFailure } from './../../../orders/store/actions/orders.actions';
import { Car } from 'src/app/shared/models/car.model';
import { CarService } from './../../services/car.service';
import { Customer } from '../../../shared/models/customer.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { Injectable } from '@angular/core';

import * as carsActions from '../actions/cars.actions';
import * as authActions from '../../../store/actions/auth.actions';

import { catchError, map, pluck, switchMap, tap } from 'rxjs/operators';

import { createEffect, Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert/alert-service';
import { TranslocoService } from '@ngneat/transloco';

import * as routerActions from './../../../store/actions/router.actions';
import { FlowRoutes } from 'src/app/core/enums/flow';

@Injectable()
export class CarsEffects {
  constructor(
    private actions$: Actions,
    private carService: CarService,
    private alertService: AlertService,
    private translocoService: TranslocoService
  ) {}

  addCar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(carsActions.addCar),
        switchMap((paylaod) =>
          this.carService.addCar(paylaod.car).pipe(
            map((car: Car) => carsActions.addCarSuccess({ car })),
            catchError((error) => of(carsActions.addCarFailure({ error })))
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  getCars$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(carsActions.loadCars),
        switchMap(() =>
          this.carService.getCars().pipe(
            map((cars) => carsActions.laodCarsSuccess({ cars })),
            catchError((error) => of(carsActions.loadCarsFailre({ error })))
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  updateCar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(carsActions.updateCar),
        switchMap((payload) =>
          this.carService.updateCar(payload.car).pipe(
            map((car) => carsActions.updateCarSuccess({ car })),
            catchError((error) => of(carsActions.updateCarFailure({ error })))
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  updateCarrSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(carsActions.updateCarSuccess),
        pluck('car'),
        map((car) => {
          this.alertService.showAlert(
            `Car ${car.id} has been updated`,
            'success'
          );
          return routerActions.go({ path: [FlowRoutes.CARS] });
        })
      ),
    {
      dispatch: true,
    }
  );

  removeCar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(carsActions.removeCar),
        switchMap((payload) =>
          this.carService.deleteCar(payload.car).pipe(
            map((car) => {
              this.alertService.showAlert(
                `Car ${car.id} has been removed`,
                'success'
              );
              return carsActions.removeCarSuccess({ car });
            }),
            catchError((error) => of(carsActions.removeCarFailure({ error })))
          )
        )
      ),
    {
      dispatch: true,
    }
  );
}
