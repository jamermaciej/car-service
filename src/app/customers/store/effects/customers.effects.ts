import {
  updateCustomerSuccess,
  updateCustomerFailre,
} from './../actions/customers.actions';
import { Customer } from './../../../shared/models/customer.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { Injectable, Optional } from '@angular/core';

import * as customersActions from '../actions/customers.actions';
import * as authActions from '../../../store/actions/auth.actions';

import { catchError, map, pluck, switchMap, tap } from 'rxjs/operators';

import { createEffect, Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert/alert-service';
import { TranslocoService } from '@ngneat/transloco';
import { CustomerService } from '../../services/customer.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AddCustomerModalComponent } from '../../components/add-customer-modal/add-customer-modal.component';
import { FlowRoutes } from 'src/app/core/enums/flow';
import * as routerActions from './../../../store/actions/router.actions';

@Injectable()
export class CustomersEffects {
  // private dialogRef: MatDialogRef<AddCustomerModalComponent>;

  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private alertService: AlertService,
    private translocoService: TranslocoService
  ) {}

  addCustomer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(customersActions.addCustomer),
        switchMap((paylaod) =>
          this.customerService.addCustomer(paylaod.customer).pipe(
            map((customer: Customer) =>
              customersActions.addCustomerSuccess({ customer })
            ),
            catchError((error) =>
              of(customersActions.addCustomerFailure({ error }))
            )
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  addCustomerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(customersActions.addCustomerSuccess),
        tap(({ customer }) => {
          const successMessage = this.translocoService.translate(
            'customer.success.add_customer'
          );
          this.alertService.showAlert(successMessage, 'success');
        })
      ),
    {
      dispatch: false,
    }
  );

  // addCustomerSuccess$ = createEffect(() => this.actions$.pipe(
  //     ofType(customersActions.addCustomerSuccess),
  //     tap(({ customer }) => this.dialogRef.close({ customer }))
  // ), {
  //     dispatch: false
  // });

  addCustomerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(customersActions.addCustomerFailure),
        tap(({ error }) =>
          this.alertService.showAlert(error.error.message, 'error')
        )
      ),
    {
      dispatch: false,
    }
  );

  // getCustomer$ = createEffect(() => this.actions$.pipe(
  //     ofType(customersActions.getCustomer),
  //     switchMap((payload) => this.customerService.getCustomer(payload.uid).pipe(
  //         map((customer) => customersActions.addCustomerSuccess(customer)),
  //         catchError((error) => of(customersActions.addCustomerFailure({ error })))
  //     ))
  // ), {
  //     dispatch: true
  // });

  getCustomers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(customersActions.loadCustomers),
        switchMap(() =>
          this.customerService.getCustomers().pipe(
            map((customers) =>
              customersActions.laodCustomersSuccess({ customers })
            ),
            catchError((error) =>
              of(customersActions.loadCustomersFailre({ error }))
            )
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  removeCustomer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(customersActions.removeCustomer),
        switchMap((payload) =>
          this.customerService.deleteCustomer(payload.customer).pipe(
            map((customer) =>
              customersActions.removeCustomerSuccess({ customer })
            ),
            catchError((error) =>
              of(customersActions.removeCustomerFailre({ error }))
            )
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  updateCustomer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(customersActions.updateCustomer),
        switchMap((payload) =>
          this.customerService.updateCustomer(payload.customer).pipe(
            map((customer) =>
              customersActions.updateCustomerSuccess({ customer })
            ),
            catchError((error) =>
              of(customersActions.updateCustomerFailre({ error }))
            )
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  updateCustomerSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(customersActions.updateCustomerSuccess),
        pluck('customer'),
        map((customer) => {
          this.alertService.showAlert(
            `Customer ${customer.id} has been updated`,
            'success'
          );
          return routerActions.go({ path: [FlowRoutes.CUSTOMERS] });
        })
      ),
    {
      dispatch: true,
    }
  );
}
