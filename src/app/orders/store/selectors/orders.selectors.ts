import { Order } from 'src/app/shared/models/order.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrders from '../reducers/orders.reducer';
import { getUser } from 'src/app/store/selectors/auth.selectors';
import { User } from 'src/app/shared/models/user.model';

export const getOrderState = createFeatureSelector<fromOrders.OrdersState>('orders');

export const getOrders = createSelector(getOrderState, fromOrders.selectAll);
export const getOrdersEntities = createSelector(
    getOrderState,
    fromOrders.selectEntities
)

export const getOrder = (id: number) => createSelector(
    getOrdersEntities, orders => orders[id]);
export const getOrdersById = (id: string ) => createSelector(
    getOrdersEntities, orders => orders[id]);
export const getOrdersLoggedUser = createSelector(
    getOrders,
    getUser,
    (orders: Order[], user: User) => 
        orders.filter((order: Order) => order.user?.uid === user.uid)
);

