import { AddCarModalComponent } from './../../../cars/components/add-car-modal/add-car-modal.component';
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
import { Car } from 'src/app/shared/models/car.model';
import { getCar, getCars } from 'src/app/cars/store/selectors/cars.selectors';
import { User } from 'src/app/shared/models/user.model';
import { getUsers } from 'src/app/admin/store/selectors/users.selectors';
import { filter } from 'rxjs/operators';
import { Status } from 'src/app/shared/models/status.model';
import { getStatuses } from 'src/app/admin/store/selectors/statuses.selectors';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  @ViewChild('customersSelect') customersSelect: MatSelect;
  @ViewChild('carsSelect') carsSelect: MatSelect;
  orderForm: FormGroup;
  customerForm: FormGroup;
  customers$: Observable<Customer[]>;
  cars$: Observable<Car[]>;
  selectedCustomer: Customer;
  selectedCar: Car;
  filteredCustomers$: Observable<Customer[]>;
  filteredCars$: Observable<Car[]>;

  users$: Observable<User[]>;

  statuses$: Observable<Status[]>;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      customer_id: ['', RequiredValidator.required],
      car_id: ['', RequiredValidator.required],
      delivery_date: [''],
      deadline: [''],
      user: [''],
      status: [''],
      notes: [''],
      test_drive_agree: ['']
    });

    this.customers$ = this.store.select(getCustomers);
    this.filteredCustomers$ = this.customers$;

    this.cars$ = this.store.select(getCars);
    this.filteredCars$ = this.cars$;

    this.users$ = this.store.select(getUsers);

    this.statuses$ = this.store.select(getStatuses);
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

  changeCar() {
    const id = this.carsSelect.value;
    this.store.select(getCar, { id }).subscribe((car: Car) => {
      this.selectedCar = car;

      this.orderForm.get('car_id').setValue(id);
    });
  }

  addCustomer() {
    this.dialog.open(AddCustomerModalComponent, {
      panelClass: 'add-customer-dialog',
      autoFocus: false
    });
  }

  addCar() {
    this.dialog.open(AddCarModalComponent, {
      panelClass: 'add-car-dialog',
      autoFocus: false
    });
  }

  clearSelectCustomer() {
    this.customersSelect.value = null;
  }

  clearSelectCar() {
    this.carsSelect.value = null;
  }

  filterCustomers(value) {
    this.filteredCustomers$ = this.customers$.pipe(
      map(customers => customers.filter(customer => customer.surname.toLowerCase().startsWith(value)))
    );
  }

  filterCars(value) {
    this.filteredCars$ = this.cars$.pipe(
      map(cars => cars.filter(car => car.brand.toLowerCase().startsWith(value)))
    );
  }
}
