import { Order } from '../../../shared/models/order.model';
import { createAction, props } from '@ngrx/store';

export const addOrder = createAction(
    '[Order] Add Order',
    props<{ order: Order  }>()
);

export const addOrderSuccess = createAction(
    '[Order] Add Order Success',
    props<{ order: Order }>()
);

export const addOrderFailure = createAction(
    '[Order] Add Order Failure',
    props<{ error: any }>()
);

export const loadOrders = createAction(
    '[Order] Get Orders Failure'
);

export const loadOrdersSuccess = createAction(
    '[Order] Get Orders Failure',
    props<{ orders: Order[] }>()
);

export const loadOrdersFailure = createAction(
    '[Order] Get Orders Failure',
    props<{ error: any }>()
);
