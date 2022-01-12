import { Car } from 'src/app/shared/models/car.model';
import { createAction, props } from '@ngrx/store';

export const addCar = createAction('[Car] Add Car', props<{ car: Car }>());

export const addCarSuccess = createAction(
  '[Car] Add Car Success',
  props<{ car: Car }>()
);

export const addCarFailure = createAction(
  '[Car] Add Car Failure',
  props<{ error: any }>()
);

export const getCar = createAction(
  '[Car] Get Customer',
  props<{ uid: string }>()
);

export const loadCars = createAction('[Car] Get Cars');

export const laodCarsSuccess = createAction(
  '[Car] Get Cars Success',
  props<{ cars: Car[] }>()
);

export const loadCarsFailre = createAction(
  '[Car] Get Cars Failure',
  props<{ error: any[] }>()
);

export const removeCar = createAction(
  '[Car] Remove Car',
  props<{ car: Car }>()
);

export const removeCarSuccess = createAction(
  '[Car] Remove Car Success',
  props<{ car: Car }>()
);

export const removeCarFailure = createAction(
  '[Car] Remove Car Failure',
  props<{ error: any }>()
);
