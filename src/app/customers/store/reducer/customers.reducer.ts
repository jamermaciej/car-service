import { Customer } from './../../../shared/models/customer.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as customersActions from '../actions/customers.actions';

export interface State {
    customers: Customer[];
}

export const initialState: State = {
    customers: []
};

const customersReducer = createReducer(
    initialState,
    on(customersActions.addCustomerSuccess, (state, { customer } ) => ({
        ...state,
        customers: [...state.customers, customer]
    })),
    on(customersActions.laodCustomersSuccess, (state, { customers } ) => ({
        ...state,
        customers
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return customersReducer(state, action);
}

export const getCustomers = (state: State) => state.customers;
