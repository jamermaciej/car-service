import { updateCustomerSuccess } from './../actions/customers.actions';
import { Customer } from './../../../shared/models/customer.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as customersActions from '../actions/customers.actions';

export interface State {
  customers: Customer[];
  error: string | null;
}

export const initialState: State = {
  customers: [],
  error: null,
};

const customersReducer = createReducer(
  initialState,
  on(customersActions.addCustomerSuccess, (state, { customer }) => ({
    ...state,
    customers: [...state.customers, customer],
    error: null,
  })),
  on(customersActions.laodCustomersSuccess, (state, { customers }) => ({
    ...state,
    customers,
  })),
  on(customersActions.removeCustomerSuccess, (state, { id }) => ({
    ...state,
    customers: state.customers.filter((c) => c.id !== id),
  })),
  on(customersActions.updateCustomerSuccess, (state, { customer }) => ({
    ...state,
    customers: state.customers.map((c) =>
      c.id === customer.id ? customer : c
    ),
  })),
  on(customersActions.addCustomerFailure, (state, { error }) => ({
    ...state,
    error: error.error.message,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return customersReducer(state, action);
}

export const getCustomers = (state: State) => state.customers;
