import { Car } from 'src/app/shared/models/car.model';
import { CarService } from './../../services/car.service';
import { Customer } from '../../../shared/models/customer.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { Injectable } from '@angular/core';

import * as carsActions from '../actions/cars.actions';
import * as authActions from '../../../store/actions/auth.actions';

import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { createEffect, Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert/alert-service';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class CarsEffects {

    constructor(
        private actions$: Actions,
        private carService: CarService,
        private alertService: AlertService,
        private translocoService: TranslocoService
    ) {}

    addCar$ = createEffect(() => this.actions$.pipe(
        ofType(carsActions.addCar),
        switchMap((paylaod) => this.carService.addCar(paylaod.car).pipe(
            map((car: Car) => carsActions.addCarSuccess({ car })),
            catchError((error) => of(carsActions.addCarFailure({ error })))
        ))
    ), {
        dispatch: true
    });

    getCars$ = createEffect(() => this.actions$.pipe(
        ofType(carsActions.loadCars),
        switchMap(() => this.carService.getCars().pipe(
            map((cars) => carsActions.laodCarsSuccess({ cars })),
            catchError((error) => of(carsActions.loadCarsFailre({ error })))
        ))
    ), {
        dispatch: true
    });
}
