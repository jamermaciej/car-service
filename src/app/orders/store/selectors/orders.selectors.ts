import { Order } from 'src/app/shared/models/order.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrders from '../reducers/orders.reducer';

export const getOrderState = createFeatureSelector<fromOrders.State>('orders');

export const getOrders = createSelector(getOrderState, fromOrders.getOrders);
export const getOrder = createSelector(
    getOrders,
    (orders: Order[], { id }) => {
        return orders.find((order: Order) => order.id === id);
    }
);
