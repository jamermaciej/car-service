import { Car } from 'src/app/shared/models/car.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCustomers from '../index';

export const getCarsState = createFeatureSelector<fromCustomers.State>('cars');

export const getCars = createSelector(getCarsState, (state: fromCustomers.State) => state.cars);
export const getCar = createSelector(
    getCars,
    (cars: Car[], { id }) => {
        return cars.find((car: Car) => car._id === id);
    }
);
