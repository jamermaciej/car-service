import { MessageService } from './../../../core/services/message/message.service';
import { Order } from './../../../shared/models/order.model';
import { OrderService } from './../../services/order.service';
import { Injectable } from '@angular/core';

import * as ordersActions from '../actions/orders.actions';
import * as routerActions from './../../../store/actions/router.actions';

import {
  catchError,
  flatMap,
  map,
  switchMap,
  tap,
  mergeMap,
  pluck,
} from 'rxjs/operators';

import { createEffect, Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert/alert-service';
import { TranslocoService } from '@ngneat/transloco';
import { FlowRoutes } from 'src/app/core/enums/flow';

@Injectable()
export class CarsEffects {
  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private messageService: MessageService,
    private alertService: AlertService,
    private translocoService: TranslocoService
  ) {}

  addOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ordersActions.addOrder),
        switchMap((paylaod) =>
          this.orderService.addOrder(paylaod.order).pipe(
            map((order: Order) => ordersActions.addOrderSuccess({ order })),
            catchError((error) => of(ordersActions.addOrderFailure({ error })))
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  addOrderSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ordersActions.addOrderSuccess),
        switchMap((paylaod) =>
          this.messageService
            .sendMessage(paylaod.order)
            .pipe(map(() => routerActions.go({ path: [FlowRoutes.ORDERS] })))
        )
      ),
    {
      dispatch: true,
    }
  );

  getOrders$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ordersActions.loadOrders),
        switchMap(() =>
          this.orderService.getOrders().pipe(
            map((orders) => ordersActions.loadOrdersSuccess({ orders })),
            catchError((error) =>
              of(ordersActions.loadOrdersFailure({ error }))
            )
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  updateOrders$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ordersActions.updateOrder),
        switchMap((paylaod) =>
          this.orderService.updateOrder(paylaod.order).pipe(
            map((order) => ordersActions.updateOrderSuccess({ order })),
            catchError((error) =>
              of(ordersActions.updateOrderFailure({ error }))
            )
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  updateOrderSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ordersActions.updateOrderSuccess),
        map(() => {
          this.alertService.showAlert('Order updated', 'success');
          return routerActions.back();
        })
      ),
    {
      dispatch: true,
    }
  );

  updateStatus$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ordersActions.updateStatus),
        pluck('order'),
        switchMap((order) =>
          this.orderService.updateOrder(order).pipe(
            map((order: Order) => ordersActions.updateStatusSuccess({ order })),
            catchError((error) =>
              of(ordersActions.updateStatusFailure({ error }))
            )
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  updateStatusSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ordersActions.updateStatusSuccess),
        pluck('order'),
        map((order) => {
          this.alertService.showAlert(`Status in order #${order.id} updated`, 'success');
        })
      ),
    {
      dispatch: false,
    }
  );

  getOrdersByUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ordersActions.loadOrdersByUser),
        pluck('id'),
        switchMap((id) =>
          this.orderService.getOrdersByUser(id).pipe(
            map((orders) => ordersActions.loadOrdersByUserSuccess({ orders })),
            catchError((error) =>
              of(ordersActions.loadOrdersByUserFailure({ error }))
            )
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  removeOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ordersActions.removeOrder),
        pluck('id'),
        switchMap((id: number) =>
          this.orderService.removeOrder(id).pipe(
            map(() => {
              this.alertService.showAlert(
                `Order ${id} has been removed`,
                'success'
              );
              return ordersActions.removeOrderSuccess({ id });
            }),
            catchError((error) =>
              of(ordersActions.removeOrderFailure({ error }))
            )
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  // removeOrderSuccess = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(ordersActions.removeOrderSuccess),
  //       map(() => routerActions.go({ path: [FlowRoutes.ORDERS] }))
  //     ),
  //   {
  //     dispatch: true,
  //   }
  // );
}
