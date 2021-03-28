import { Car } from 'src/app/shared/models/car.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as carsActions from '../actions/cars.actions';

export interface State {
    cars: Car[];
}

export const initialState: State = {
    cars: []
};

const carsReducer = createReducer(
    initialState,
    on(carsActions.addCarSuccess, (state, { car } ) => ({
        ...state,
        cars: [...state.cars, car]
    })),
    on(carsActions.laodCarsSuccess, (state, { cars } ) => ({
        ...state,
        cars
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return carsReducer(state, action);
}

export const getCars = (state: State) => state.cars;
