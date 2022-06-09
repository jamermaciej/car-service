import { Action, createReducer, on } from '@ngrx/store';
import * as orderActions from '../actions/orders.actions';
import { Order } from 'src/app/shared/models/order.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface OrdersState extends EntityState<Order> {};

export const ordersAdapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export const initialState: OrdersState = ordersAdapter.getInitialState();

const orderReducer = createReducer(
  initialState,
  on(orderActions.addOrderSuccess, (state, { order }) => {
    return ordersAdapter.addOne(order, state);
  }),
  on(
    orderActions.loadOrdersSuccess,
    orderActions.loadOrdersByUserSuccess,
    (state, { orders }) => {
      return ordersAdapter.setAll(orders, state);
    }
  ),
  on(orderActions.updateOrderSuccess, orderActions.updateStatusSuccess, (state, { order }) => {
    return ordersAdapter.updateOne(order, state);
  }),
  on(orderActions.removeOrderSuccess, (state, { id }) => {
    return ordersAdapter.removeOne(id, state);
  })
);

export function reducer(state: OrdersState | undefined, action: Action) {
  return orderReducer(state, action);
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal

} = ordersAdapter.getSelectors();
