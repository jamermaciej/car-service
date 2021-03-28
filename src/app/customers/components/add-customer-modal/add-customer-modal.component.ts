import { Customer } from './../../../shared/models/customer.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomerService } from '../../services/customer.service';
import * as fromCustomers from '../../store';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-customer-modal',
  templateUrl: './add-customer-modal.component.html',
  styleUrls: ['./add-customer-modal.component.scss']
})
export class AddCustomerModalComponent implements OnInit {

  constructor(private customerService: CustomerService,
              private store: Store<fromCustomers.State>,
              private dialogRef: MatDialogRef<AddCustomerModalComponent>,
            ) { }

  ngOnInit(): void {

  }

  addCustomer(customer: Customer) {
    this.store.dispatch(fromCustomers.addCustomer({ customer }));
    this.dialogRef.close();
  }

}
