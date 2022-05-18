import { Order } from '../../../shared/models/order.model';
import { createAction, props } from '@ngrx/store';

export const addOrder = createAction(
  '[Order] Add Order',
  props<{ order: Order }>()
);

export const addOrderSuccess = createAction(
  '[Order] Add Order Success',
  props<{ order: Order }>()
);

export const addOrderFailure = createAction(
  '[Order] Add Order Failure',
  props<{ error: any }>()
);

export const loadOrders = createAction('[Order] Get Orders');

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
  props<{ order: Order }>()
);

export const updateOrderSuccess = createAction(
  '[Order] Update Order Success',
  props<{ order: Order }>()
);

export const updateOrderFailure = createAction(
  '[Order] Update Order Failure',
  props<{ error: any }>()
);

export const removeOrder = createAction(
  '[Order] Remove Order',
  props<{ id: number }>()
);

export const removeOrderSuccess = createAction(
  '[Order] Remove Order Success',
  props<{ id: number }>()
);

export const removeOrderFailure = createAction(
  '[Order] Remove Order Failure',
  props<{ error: any }>()
);

export const updateStatus = createAction(
  '[Order] Update Status',
  props<{ order: Order }>()
);

export const updateStatusSuccess = createAction(
  '[Order] Update Status Success',
  props<{ order: Order }>()
);

export const updateStatusFailure = createAction(
  '[Order] Update Status Failure',
  props<{ error: any }>()
);
