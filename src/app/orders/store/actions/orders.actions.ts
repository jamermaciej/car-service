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
    '[Order] Get Orders'
);

export const loadOrdersSuccess = createAction(
    '[Order] Get Orders Success',
    props<{ orders: Order[] }>()
);

export const loadOrdersFailure = createAction(
    '[Order] Get Orders Failure',
    props<{ error: any }>()
);

export const loadOrdersByUser = createAction(
    '[Order] Get Orders by User',
    props<{ id: string }>()
);

export const loadOrdersByUserSuccess = createAction(
    '[Order] Get Orders by User Success',
    props<{ orders: Order[] }>()
);

export const loadOrdersByUserFailure = createAction(
    '[Order] Get Orders by User Failure',
    props<{ error: any }>()
);

export const updateOrder = createAction(
    '[Order] Update Order',
    props<{ order: Order  }>()
);

export const updateOrderSuccess = createAction(
    '[Order] Update Order Success',
    props<{ order: Order }>()
);

export const updateOrderFailure = createAction(
    '[Order] Update Order Failure',
    props<{ error: any }>()
);
