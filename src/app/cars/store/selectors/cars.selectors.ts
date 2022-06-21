import { Car } from 'src/app/shared/models/car.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCars from '../index';

export const getCarsState = createFeatureSelector<fromCars.State>('cars');

export const getCars = createSelector(getCarsState, (state: fromCars.State) => state?.cars);
export const getCar = (id: number) => createSelector(getCars, (cars: Car[]) => cars.find((car: Car) => car.id === id));
