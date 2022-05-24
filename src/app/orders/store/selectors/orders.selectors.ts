import { Order } from 'src/app/shared/models/order.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrders from '../reducers/orders.reducer';
import { getUser } from 'src/app/store/selectors/auth.selectors';
import { User } from 'src/app/shared/models/user.model';

export const getOrderState = createFeatureSelector<fromOrders.State>('orders');

export const getOrders = createSelector(getOrderState, fromOrders.getOrders);
export const getOrder = (id: number) =>
    createSelector(getOrders, (orders: Order[]) => orders.find((order: Order) => order.id === id));
export const getOrdersById = (id: string ) =>
    createSelector(getOrders, (orders: Order[]) => orders.filter((order: Order) => order.user?.uid === id));
export const getOrdersLoggedUser = createSelector(
    getOrders,
    getUser,
    (orders: Order[], user: User) => orders.filter((order: Order) => order.user?.uid === user.uid)
);
