import { Customer } from './../../../shared/models/customer.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { Injectable, Optional } from '@angular/core';

import * as customersActions from '../actions/customers.actions';
import * as authActions from '../../../store/actions/auth.actions';

import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { createEffect, Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert/alert-service';
import { TranslocoService } from '@ngneat/transloco';
import { CustomerService } from '../../services/customer.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AddCustomerModalComponent } from '../../components/add-customer-modal/add-customer-modal.component';

@Injectable()
export class CustomersEffects {
    // private dialogRef: MatDialogRef<AddCustomerModalComponent>;

    constructor(
        private actions$: Actions,
        private customerService: CustomerService,
        private alertService: AlertService,
        private translocoService: TranslocoService,
    ) {}

    addCustomer$ = createEffect(() => this.actions$.pipe(
        ofType(customersActions.addCustomer),
        switchMap((paylaod) => this.customerService.addCustomer(paylaod.customer).pipe(
            map((customer: Customer) => customersActions.addCustomerSuccess({ customer })),
            catchError((error) => of(customersActions.addCustomerFailure({ error })))
        ))
    ), {
        dispatch: true
    });

    addCustomerSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(customersActions.addCustomerSuccess),
        tap(({ customer }) => {
            const successMessage = this.translocoService.translate('customer.success.add_customer');
            this.alertService.showAlert(successMessage, 'success');
        })
    ), {
        dispatch: false
    });

    // addCustomerSuccess$ = createEffect(() => this.actions$.pipe(
    //     ofType(customersActions.addCustomerSuccess),
    //     tap(({ customer }) => this.dialogRef.close({ customer }))
    // ), {
    //     dispatch: false
    // });

    addCustomerFailure$ = createEffect(() => this.actions$.pipe(
        ofType(customersActions.addCustomerFailure),
        tap(({ error }) => this.alertService.showAlert(error.error.message, 'error'))
    ), {
        dispatch: false
    });


    // getCustomer$ = createEffect(() => this.actions$.pipe(
    //     ofType(customersActions.getCustomer),
    //     switchMap((payload) => this.customerService.getCustomer(payload.uid).pipe(
    //         map((customer) => customersActions.addCustomerSuccess(customer)),
    //         catchError((error) => of(customersActions.addCustomerFailure({ error })))
    //     ))
    // ), {
    //     dispatch: true
    // });

    getCustomers$ = createEffect(() => this.actions$.pipe(
        ofType(customersActions.loadCustomers),
        switchMap(() => this.customerService.getCustomers().pipe(
            map((customers) => customersActions.laodCustomersSuccess({ customers })),
            catchError((error) => of(customersActions.loadCustomersFailre({ error })))
        ))
    ), {
        dispatch: true
    });
}
