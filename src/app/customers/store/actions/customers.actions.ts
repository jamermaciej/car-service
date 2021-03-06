import { Customer } from '../../../shared/models/customer.model';
import { createAction, props } from '@ngrx/store';

export const addCustomer = createAction(
    '[Customer] Add Customer',
    props<{ customer: Customer }>()
);

export const addCustomerSuccess = createAction(
    '[Customer] Add Customer Success',
    props<{ customer: Customer }>()
);

export const addCustomerFailure = createAction(
    '[Customer] Add Customer Failure',
    props<{ error: any }>()
);

export const getCustomer = createAction(
    '[Customer] Get Customer',
    props<{ uid: string }>()
);

export const loadCustomers = createAction(
    '[Customer] Get Customers'
);

export const laodCustomersSuccess = createAction(
    '[Customer] Get Customers Success',
    props<{ customers: Customer[] }>()
);

export const loadCustomersFailre = createAction(
    '[Customer] Get Customers Failure',
    props<{ error: any[] }>()
);
