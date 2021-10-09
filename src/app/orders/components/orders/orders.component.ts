import { Role } from './../../../core/enums/roles';
import { getUser } from './../../../store/selectors/auth.selectors';
import { updateOrder } from './../../store/actions/orders.actions';
import { updateStatus } from './../../../admin/store/actions/statuses.actions';
import { Status } from './../../../shared/models/status.model';
import { getCustomer, getCustomers } from './../../../customers/store/selectors/customers.selectors';
import { FlowRoutes } from 'src/app/core/enums/flow';
import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { filter, first, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { combineLatest, Observable, Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { getUsers } from 'src/app/admin/store/selectors/users.selectors';
import { UserService } from 'src/app/core/services/user/user.service';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../store';
import * as fromUsers from './../../../admin/store';
import { getOrder, getOrders, getOrdersById, getOrdersLoggedUser } from '../../store/selectors/orders.selectors';
import { Order } from 'src/app/shared/models/order.model';
import { getCar } from 'src/app/cars/store/selectors/cars.selectors';
import { getStatuses } from 'src/app/admin/store/selectors/statuses.selectors';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterViewInit, OnDestroy {
  destroySubject$: Subject<any> = new Subject();
  flowRoutes = FlowRoutes;
  users$: Observable<User[]>;
  orders$: Observable<Order[]>;
  statuses$: Observable<Status[]>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns = ['id', 'customer_id', 'car_id', 'delivery_date', 'deadline', 'user_id', 'status', 'notes', 'test_drive_agree'];
  orders = new MatTableDataSource<any>();

  constructor(private store: Store<fromRoot.State>, private userService: UserService) {

  }

  ngOnInit(): void {
    combineLatest([
      this.store.select(getOrders),
      this.store.select(getUser)
    ]).pipe(
      takeUntil(this.destroySubject$),
      map(([orders, user]) => {
        const isEmployee = user.roles.includes(Role.CUSTOMER);
        if ( isEmployee ) {
          return orders.filter(order => order.user?.uid === user.uid);
        } else {
          return orders;
        }
      })
    ).subscribe((orders: Order[]) => {
      this.orders.data = orders;
    });

    // this.store.select(getUser).pipe(
    //   takeUntil(this.destroySubject$),
    //   switchMap((user: User) => this.store.select(getOrdersById, { id: user.uid }))
    // ).subscribe(orders => {
    //   this.orders.data = orders;
    // });

    this.statuses$ = this.store.select(getStatuses);
  }

  getCustomerData(id: number): Observable<string> {
    return this.store.select(getCustomer, { id }).pipe(
      filter(customer => !!customer),
      map(customer => `${customer.name} ${customer.surname}`));
  }

  getCarData(id: number) {
    return this.store.select(getCar, { id }).pipe(
      filter(car => !!car),
      map(car => `${car.model} ${car.brand}`));
  }

  getUserData(uid: string) {
    return this.store.select(getUser, uid).pipe(
      filter(user => !!user),
      map(user => `${user.displayName}`));
  }

  ngAfterViewInit() {
    this.orders.sort = this.sort;
    this.orders.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.orders.filter = filterValue.trim().toLowerCase();
  }

  updateOrder(status: string, id: number) {
    this.store.select(getOrder, { id }).pipe(
      take(1),
      takeUntil(this.destroySubject$)
    ).subscribe(order => {
      const newOrder = {
        ...order,
        status
      };
      this.store.dispatch(updateOrder({ order: newOrder }));
    });
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

}
