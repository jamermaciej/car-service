import { Action, createReducer, on } from '@ngrx/store';
import * as orderActions from '../actions/orders.actions';
import { Order } from 'src/app/shared/models/order.model';

export interface State {
    orders: Order[];
}

export const initialState = {
    orders: []
};

const orderReducer = createReducer(
    initialState,
    on(orderActions.addOrderSuccess, (state, { order } ) => ({
        ...state,
        orders: [ ...state.orders, order ]
    })),
    on(orderActions.loadOrdersSuccess, (state, { orders } ) => ({
        ...state,
        orders
    }))
  );

export function reducer(state: State | undefined, action: Action) {
    return orderReducer(state, action);
}

export const getOrders = (state: State) => state.orders;