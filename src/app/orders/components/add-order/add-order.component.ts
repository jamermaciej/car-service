import * as fromOrders from './../../store/';
import { MessageService } from './../../../core/services/message/message.service';
import { AddCarModalComponent } from './../../../cars/components/add-car-modal/add-car-modal.component';
import { RequiredValidator } from './../../../shared/validators/required-validator';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerModalComponent } from 'src/app/customers/components/add-customer-modal/add-customer-modal.component';
import {
  getCustomer,
  getCustomers,
} from 'src/app/customers/store/selectors/customers.selectors';
import { Customer } from 'src/app/shared/models/customer.model';
import { MatSelect } from '@angular/material/select';
import { Car } from 'src/app/shared/models/car.model';
import { getCar, getCars } from 'src/app/cars/store/selectors/cars.selectors';
import { User } from 'src/app/shared/models/user.model';
import { getUsers } from 'src/app/admin/store/selectors/users.selectors';
import { filter, find, switchMap, take, delay, timeout, map, tap } from 'rxjs/operators';
import { Status } from 'src/app/shared/models/status.model';
import { getStatuses } from 'src/app/admin/store/selectors/statuses.selectors';
import { MatInput } from '@angular/material/input';
import * as dayjs from 'dayjs';
import { Order } from 'src/app/shared/models/order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizeRouterService } from '@penleychan/ngx-transloco-router';
import * as fromUsers from '../../../admin/store';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit {
  @ViewChild('customersSelect') customersSelect: MatSelect;
  @ViewChild('carsSelect') carsSelect: MatSelect;
  // @ViewChild('searchCustomerInput') searchCustomerInput: MatInput;
  @ViewChild('searchCustomerInput') searchCustomerInput: ElementRef;
  orderForm: FormGroup;
  customerForm: FormGroup;
  customers$: Observable<Customer[]>;
  cars$: Observable<Car[]>;
  selectedCustomer: Observable<Customer>;
  selectedCar: Observable<Car>;
  filteredCustomers$: Observable<Customer[]>;
  filteredCars$: Observable<Car[]>;
  todayDate: Date = new Date();
  minDeadline = dayjs().format();

  users$: Observable<User[]>;

  statuses$: Observable<Status[]>;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private store: Store<fromOrders.OrdersState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private localize: LocalizeRouterService
  ) {}

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      customer: ['', Validators.required],
      car: ['', Validators.required],
      delivery_date: [new Date()],
      deadline: [new Date()],
      user: [''],
      status: ['Order accepted', Validators.required],
      notes: [''],
      test_drive_agree: [true],
    });

    this.customers$ = this.store.select(getCustomers);
    this.filteredCustomers$ = this.customers$;

    this.cars$ = this.store.select(getCars);
    this.filteredCars$ = this.cars$;

    this.store.dispatch(fromUsers.getUsers());
    this.users$ = this.store.select(getUsers);

    this.statuses$ = this.store.select(getStatuses);

    const deadlineDate = dayjs().add(1, 'day').format();
    this.orderForm.get('deadline').setValue(deadlineDate);

    // if (this.activatedRoute.snapshot.queryParams['dialog']) {
    //   this.dialog.open(AddCustomerModalComponent, {
    //     panelClass: 'add-customer-dialog',
    //     autoFocus: false,
    //   });
    // }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const {
        customer,
        car,
        delivery_date,
        deadline,
        user,
        status,
        notes,
        test_drive_agree,
      } = this.orderForm.value;
      const order = {
        id: null,
        customer: {
          id: customer.id,
          name: customer.name,
          surname: customer.surname,
        },
        car: {
          id: car.id,
          brand: car.brand,
          model: car.model,
        },
        delivery_date,
        deadline,
        user,
        status,
        notes,
        test_drive_agree,
      };
      this.store.dispatch(fromOrders.addOrder({ order }));
    } else {
      this.validateAllFormFields(this.orderForm);
    }
  }

  changeCustomer() {
    const { id } = this.customersSelect.value;
    this.selectedCustomer = this.store.select(getCustomer(id));
    // this.store.select(getCustomer, { id }).subscribe((customer: Customer) => {
    //   this.selectedCustomer = customer;
    //   this.orderForm.get('customer_id').setValue(id);
    // });
    this.orderForm.get('customer').setValue(this.customersSelect.value);
  }

  closeCarSelect(searchCarInput: MatInput) {
    this.filteredCars$ = this.cars$;
    searchCarInput.value = null;
  }

  changeCar() {
    const car = this.carsSelect.value;
    const { id } = car;
    this.selectedCar = this.store.select(getCar(id));
    // this.store.select(getCar, { id }).subscribe((car: Car) => {
    //   this.selectedCar = car;
    //   this.orderForm.get('car_id').setValue(id);
    // });
    this.orderForm.get('car').setValue(car);
  }

  addCustomer() {
    // const translatedRoute = this.localize.translateRoute(['/orders/add/new-customer']);
    // this.router.navigate([...translatedRoute]);

    const dialogRef = this.dialog.open(AddCustomerModalComponent, {
      panelClass: 'add-customer-dialog',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const idNumber = res.customer.idNumber;
        this.selectedCustomer = this.customers$.pipe(
          map((customers) => customers.find((c) => c.idNumber === idNumber)),
          tap((customer) => this.orderForm.get('customer').setValue(customer))
        );
        this.searchCustomerInput.nativeElement.value = null;
        this.filteredCustomers$ = this.customers$;
        // this.customers$.pipe(
        //   timeout(3000),
        //   tap(c => console.log(c)),
        //   map(customers => customers.find(c => c.idNumber === idNumber))
        // ).subscribe(customer => {
        //   console.log(idNumber);
        //   this.selectedCustomer = customer;
        //   this.orderForm.get('customer_id').setValue(customer.id);
        // });
      }
    });
  }

  compareCustomer(value: Customer, customer: Customer) {
    return value.id === customer?.id;
  }

  addCar() {
    const dialogRef = this.dialog.open(AddCarModalComponent, {
      panelClass: 'add-car-dialog',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const vin = res.car.vin;
        this.selectedCar = this.cars$.pipe(
          map((cars) => cars.find((c) => c.vin === vin)),
          tap((car) => this.orderForm.get('car').setValue(car))
        );
        // this.cars$.pipe(
        //   map(cars => cars.find(c => c.vin === vin)),
        // ).subscribe(car => {
        //   console.log(car);
        //   this.selectedCar = car;
        //   this.orderForm.get('car_id').setValue(car.id); // formControlName ?
        // });
      }
    });
  }

  compareCar(value: Car, car: Car) {
    return value.id === car?.id;
  }

  clearSelectCustomer() {
    this.customersSelect.value = null;
  }

  clearSelectCar() {
    this.carsSelect.value = null;
  }

  filterCustomers(value) {
    this.filteredCustomers$ = this.customers$.pipe(
      map((customers) =>
        customers.filter((customer) =>
          customer.surname.toLowerCase().startsWith(value)
        )
      )
    );
  }

  filterCars(value) {
    this.filteredCars$ = this.cars$.pipe(
      map((cars) =>
        cars.filter(
          (car) =>
            car.brand.toLowerCase().startsWith(value) ||
            car.registration.toLowerCase().startsWith(value)
        )
      )
    );
  }

  updateDeadline(event) {
    const deliveryDate = dayjs(event.target.value);
    const deadline = deliveryDate.add(1, 'day').format();
    this.orderForm.get('deadline').setValue(deadline);
    this.minDeadline = deliveryDate.format();
  }
}
