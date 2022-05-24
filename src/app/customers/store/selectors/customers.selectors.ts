import { Customer } from 'src/app/shared/models/customer.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCustomers from '../index';

export const getUsersState = createFeatureSelector<fromCustomers.State>('customers');

export const getCustomers = createSelector(getUsersState, (state: fromCustomers.State) => state.customers);
export const getCustomer = (id: number) =>
    createSelector(
        getCustomers, (customers: Customer[]) => customers.find((customer: Customer) => customer.id === id));
