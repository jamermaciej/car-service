import * as fromOrders from './../../store/';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FlowRoutes } from './../../../core/enums/flow';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getOrder } from '../../store/selectors/orders.selectors';
import { Observable, Subject } from 'rxjs';
import { Order } from 'src/app/shared/models/order.model';
import { takeUntil } from 'rxjs/operators';
import { go } from 'src/app/store';
import { User } from 'src/app/shared/models/user.model';
import { Status } from 'src/app/shared/models/status.model';
import { getUsers } from 'src/app/admin/store/selectors/users.selectors';
import { getStatuses } from 'src/app/admin/store/selectors/statuses.selectors';
import { Customer } from 'src/app/shared/models/customer.model';
import { getCustomers } from 'src/app/customers/store/selectors/customers.selectors';
import { Car } from 'src/app/shared/models/car.model';
import { getCars } from 'src/app/cars/store/selectors/cars.selectors';
import * as dayjs from 'dayjs';
import { Location } from '@angular/common';
import { removeOrder } from './../../store/';
import * as routerActions from './../../../store/actions/router.actions';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
})
export class EditOrderComponent implements OnInit, OnDestroy {
  destroySubject$: Subject<any> = new Subject();
  order: Order;
  orderForm: FormGroup;

  users$: Observable<User[]>;
  statuses$: Observable<Status[]>;

  customers$: Observable<Customer[]>;
  cars$: Observable<Car[]>;

  todayDate: Date = new Date();
  minDeadline = dayjs().format();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private fb: FormBuilder,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      id: [''],
      customer: [''],
      car: [''],
      delivery_date: [''],
      deadline: [''],
      user: [''],
      status: [''],
      notes: [''],
      test_drive_agree: [''],
    });

    this.users$ = this.store.select(getUsers);
    this.statuses$ = this.store.select(getStatuses);

    this.customers$ = this.store.select(getCustomers);
    this.cars$ = this.store.select(getCars);

    const id = +this.route.snapshot.paramMap.get('id');
    this.store
      .select(getOrder(id))
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((order: Order) => {
        if (order) {
          this.order = order;
          this.orderForm.patchValue(order);
          this.todayDate = order.delivery_date;
          this.minDeadline = dayjs(order.deadline).format();
        } else {
          this.store.dispatch(go({ path: [FlowRoutes.ORDERS] }));
        }
      });
  }

  compareUser(value: User, user: User) {
    return value.uid === user?.uid;
  }

  compareCustomer(value: Customer, customer: Customer) {
    return value.id === customer?.id;
  }

  compareCar(value: Car, car: Car) {
    return value.id === car?.id;
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
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
        id,
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
        id,
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
      this.store.dispatch(fromOrders.updateOrder({ order }));
    } else {
      this.validateAllFormFields(this.orderForm);
    }
  }

  updateDeadline(event) {
    const deliveryDate = dayjs(event.target.value);
    const deadline = deliveryDate.add(1, 'day').format();
    this.orderForm.get('deadline').setValue(deadline);
    this.minDeadline = deliveryDate.format();
  }

  back(): void {
    this.location.back();
  }

  removeOrder(id: number, event: MouseEvent) {
    event.stopPropagation();
    this.store.dispatch(removeOrder({ id }));
    routerActions.go({ path: [FlowRoutes.ORDERS] });
  }
}
