import { Customer } from './../../../shared/models/customer.model';
import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCustomers from '../../store';
import { MatDialogRef } from '@angular/material/dialog';
import { ofType, Actions } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add-customer-modal',
  templateUrl: './add-customer-modal.component.html',
  styleUrls: ['./add-customer-modal.component.scss']
})
export class AddCustomerModalComponent implements OnDestroy {
  destroySubject$: Subject<any> = new Subject();

  constructor(private store: Store<fromCustomers.State>,
              private actions$: Actions,
              private router: Router,
              private dialogRef: MatDialogRef<AddCustomerModalComponent>,
              private activatedRoute: ActivatedRoute
            ) {
              // this.router.navigate(
              //   [],
              //   {
              //     relativeTo: activatedRoute,
              //     queryParams: { dialog: 'new-customer' },
              //     queryParamsHandling: 'merge', // remove to replace all query params by provided
              //   }
              // )
            }


  addCustomer(customer: Customer) {
    this.store.dispatch(fromCustomers.addCustomer({ customer }));

    this.actions$.pipe(
      takeUntil(this.destroySubject$),
      ofType(fromCustomers.addCustomerSuccess)
    ).subscribe(() => this.dialogRef.close({ customer }));
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

}
