import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrders from '../reducers/orders.reducer';

export const getOrderState = createFeatureSelector<fromOrders.State>('orders');

export const getOrders = createSelector(getOrderState, fromOrders.getOrders);
