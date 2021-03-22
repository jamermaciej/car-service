import { RequiredValidator } from './../../../shared/validators/required-validator';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerModalComponent } from 'src/app/customers/components/add-customer-modal/add-customer-modal.component';
import { getCustomer, getCustomers } from 'src/app/customers/store/selectors/customers.selectors';
import { Customer } from 'src/app/shared/models/customer.model';
import { MatSelect } from '@angular/material/select';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  @ViewChild('customersSelect') customersSelect: MatSelect;
  orderForm: FormGroup;
  customerForm: FormGroup;
  customers$: Observable<Customer[]>;
  selectedCustomer: Customer;
  filteredCustomers$: Observable<Customer[]>;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      customer_id: ['', RequiredValidator.required],
      car_id: ['', RequiredValidator.required],
      date: '',
      notes: ''
    });

    this.customers$ = this.store.select(getCustomers);
    this.filteredCustomers$ = this.customers$;
  }

  onSubmit() {
    console.log(this.orderForm.value);
  }

  changeCustomer() {
    const id = this.customersSelect.value;
    this.store.select(getCustomer, { id }).subscribe((customer: Customer) => {
      this.selectedCustomer = customer;

      this.orderForm.get('customer_id').setValue(id);
    });
  }

  addCustomer() {
    this.dialog.open(AddCustomerModalComponent, {
      panelClass: 'add-customer-dialog',
      autoFocus: false
    });
  }

  clearSelect() {
    this.customersSelect.value = null;
  }

  filterCustomers(value) {
    this.filteredCustomers$ = this.customers$.pipe(
      map(customers => customers.filter(customer => customer.surname.toLowerCase().startsWith(value)))
    );
  }
}
