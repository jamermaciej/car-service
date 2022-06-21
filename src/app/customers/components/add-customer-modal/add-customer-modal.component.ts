import { Customer } from './../../../shared/models/customer.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCustomers from '../../store';
import { MatDialogRef } from '@angular/material/dialog';
import { ofType, Actions } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-customer-modal',
  templateUrl: './add-customer-modal.component.html',
  styleUrls: ['./add-customer-modal.component.scss']
})
export class AddCustomerModalComponent implements OnInit, OnDestroy {
  destroySubject$: Subject<any> = new Subject();

  constructor(private store: Store<fromCustomers.State>,
              private dialogRef: MatDialogRef<AddCustomerModalComponent>,
              private actions$: Actions
            ) { }

  ngOnInit(): void {

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
