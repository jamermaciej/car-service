import { Car } from 'src/app/shared/models/car.model';
import { createAction, props } from '@ngrx/store';

export const addCar = createAction(
    '[Customer] Add Car',
    props<{ car: Car }>()
);

export const addCarSuccess = createAction(
    '[Customer] Add Car Success',
    props<{ car: Car }>()
);

export const addCarFailure = createAction(
    '[Customer] Add Car Failure',
    props<{ error: any }>()
);

export const getCar = createAction(
    '[Customer] Get Customer',
    props<{ uid: string }>()
);

export const loadCars = createAction(
    '[Customer] Get Cars'
);

export const laodCarsSuccess = createAction(
    '[Customer] Get Cars Success',
    props<{ cars: Car[] }>()
);

export const loadCarsFailre = createAction(
    '[Customer] Get Cars Failure',
    props<{ error: any[] }>()
);
