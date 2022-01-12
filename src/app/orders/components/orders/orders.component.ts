import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Role } from './../../../core/enums/roles';
import { getUser } from './../../../store/selectors/auth.selectors';
import { removeOrder, updateOrder } from './../../store/actions/orders.actions';
import { updateStatus } from './../../../admin/store/actions/statuses.actions';
import { Status } from './../../../shared/models/status.model';
import {
  getCustomer,
  getCustomers,
} from './../../../customers/store/selectors/customers.selectors';
import { FlowRoutes } from 'src/app/core/enums/flow';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import {
  filter,
  first,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { combineLatest, Observable, Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { getUsers } from 'src/app/admin/store/selectors/users.selectors';
import { UserService } from 'src/app/core/services/user/user.service';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../store';
import * as fromUsers from './../../../admin/store';
import {
  getOrder,
  getOrders,
  getOrdersById,
  getOrdersLoggedUser,
} from '../../store/selectors/orders.selectors';
import { Order } from 'src/app/shared/models/order.model';
import { getCar } from 'src/app/cars/store/selectors/cars.selectors';
import { getStatuses } from 'src/app/admin/store/selectors/statuses.selectors';
import { isObject } from '@ngneat/transloco';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, AfterViewInit, OnDestroy {
  destroySubject$: Subject<any> = new Subject();
  flowRoutes = FlowRoutes;
  users$: Observable<User[]>;
  orders$: Observable<Order[]>;
  statuses$: Observable<Status[]>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns = [
    'id',
    'customer_id',
    'car_id',
    'delivery_date',
    'deadline',
    'user_id',
    'status',
    'notes',
    'test_drive_agree',
    'actions',
  ];
  orders = new MatTableDataSource<Order>();
  workers$: Observable<User[]>;

  filteredColumns = [
    {
      label: 'All columns',
      field: 'default',
    },
    {
      label: 'Worker',
      field: 'user.displayName',
    },
    {
      label: 'Status',
      field: 'status',
    },
    {
      label: 'Notes',
      field: 'notes',
    },
    {
      label: 'Customer name',
      field: 'customer.name',
    },
    {
      label: 'Customer surname',
      field: 'customer.surname',
    },
    {
      label: 'Car model',
      field: 'car.model',
    },
    {
      label: 'Car brand',
      field: 'car.brand',
    },
  ];
  defaulFilteredColumn = 'default';
  filteredColumn;
  defaulWorker: string;

  filterGroup: FormGroup;

  filterValues: any = {
    worker: '',
    status: '',
    default: '',
  };

  constructor(
    private store: Store<fromRoot.State>,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.orders.filterPredicate = (data: Order, f: string) => {
    //   return data.id === Number(f) ||
    //          data.user?.displayName.toLowerCase().includes(f) ||
    //          data.status.toLowerCase().includes(f) ||
    //          data.notes.toLowerCase().includes(f) ||
    //          data.car?.brand.toLowerCase().includes(f) ||
    //          data.car?.model.toLowerCase().includes(f) ||
    //          data.customer?.name.toLowerCase().includes(f);
    //  };
    // combineLatest([
    //   this.store.select(getOrders),
    //   this.store.select(getUser)
    // ]).pipe(
    //   takeUntil(this.destroySubject$),
    //   map(([orders, user]) => {
    //     const isEmployee = user.roles.includes(Role.EMPLOYEE);
    //     if ( isEmployee ) {
    //       return orders.filter(order => order.user?.uid === user.uid);
    //     } else {
    //       return orders;
    //     }
    //   })
    // ).subscribe((orders: Order[]) => {
    //   this.orders.data = orders;
    // });

    // this.store.select(getUser).pipe(
    //   takeUntil(this.destroySubject$),
    //   switchMap((user: User) => this.store.select(getOrdersById, { id: user.uid }))
    // ).subscribe(orders => {
    //   this.orders.data = orders;
    // });

    this.store
      .select(getOrders)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((orders) => {
        const sortOrder = [
          'Order accepted',
          'Awaiting parts',
          'Repairing',
          'Repaired',
        ];

        orders = [...orders].sort((a, b) => {
          console.log(a);
          return sortOrder.indexOf(a.status) - sortOrder.indexOf(b.status);
        });

        this.orders.data = orders;
      });

    this.filterGroup = this.fb.group({
      worker: '',
      status: '',
      default: '',
    });

    this.store.select(getUser).subscribe((user) => {
      const name = user.displayName;
      const roles = user.roles;
      if (roles.includes(Role.CUSTOMER)) {
        this.defaulWorker = name;
        this.filterValues.worker = name;
        this.filterGroup.get('worker').setValue(name);
        this.orders.filter = JSON.stringify(this.filterValues);
      }
    });

    this.orders.filterPredicate = this.createFilter();
    this.fieldListener();

    this.workers$ = this.store.select(getUsers);

    this.statuses$ = this.store.select(getStatuses);
  }

  getCustomerData(id: number): Observable<string> {
    return this.store.select(getCustomer, { id }).pipe(
      filter((customer) => !!customer),
      map((customer) => `${customer.name} ${customer.surname}`)
    );
  }

  getCarData(id: number) {
    return this.store.select(getCar, { id }).pipe(
      filter((car) => !!car),
      map((car) => `${car.model} ${car.brand}`)
    );
  }

  getUserData(uid: string) {
    return this.store.select(getUser, uid).pipe(
      filter((user) => !!user),
      map((user) => `${user.displayName}`)
    );
  }

  ngAfterViewInit() {
    this.orders.sort = this.sort;
    this.orders.paginator = this.paginator;
  }

  updateOrder(status: string, id: number) {
    this.store
      .select(getOrder, { id })
      .pipe(take(1), takeUntil(this.destroySubject$))
      .subscribe((order) => {
        const newOrder = {
          ...order,
          status,
        };
        this.store.dispatch(updateOrder({ order: newOrder }));
      });
  }

  changeFilteredColumn(event) {
    this.filterValues = {
      ...this.filterValues,
      [event.value]: '',
    };
    this.filteredColumn = event.value;
  }

  clearFilter(field: string) {
    this.filterGroup.get(field).setValue(null);
    this.filterValues[field] = '';
    this.orders.filter = JSON.stringify(this.filterValues);
  }

  private fieldListener() {
    this.filterGroup.get('worker').valueChanges.subscribe((worker) => {
      this.filterValues.worker = worker;
      this.orders.filter = JSON.stringify(this.filterValues);
    });
    this.filterGroup.get('status').valueChanges.subscribe((status) => {
      this.filterValues.status = status;
      this.orders.filter = JSON.stringify(this.filterValues);
    });
    this.filterGroup.get('default').valueChanges.subscribe((v) => {
      this.filterValues.default = v;
      this.orders.filter = JSON.stringify(this.filterValues);
    });
  }

  private createFilter(): (order: Order, filter: string) => boolean {
    const filterFunction = (order: Order, f: string): boolean => {
      const searchTerms = JSON.parse(f);
      const filteredFields = [];

      if (!Object.values(searchTerms).some((t) => t)) return true;

      if (searchTerms.default) {
        const v = searchTerms.default;
        if (this.filteredColumn && this.filteredColumn !== 'default') {
          const k = this.filteredColumn.split('.');
          if (!order[k[0]]) return;
          if (k[1]) {
            filteredFields.push(order[k[0]][k[1]].toLowerCase().includes(v));
          } else {
            filteredFields.push(order[k[0]].toLowerCase().includes(v));
          }
        } else {
          filteredFields.push(
            order.id === Number(v) ||
              order.user?.displayName.toLowerCase().includes(v) ||
              order.status.toLowerCase().includes(v) ||
              order.notes.toLowerCase().includes(v) ||
              order.car?.brand.toLowerCase().includes(v) ||
              order.car?.model.toLowerCase().includes(v) ||
              order.customer?.name.toLowerCase().includes(v) ||
              order.customer?.surname.toLowerCase().includes(v)
          );
        }
      }

      if (searchTerms.worker) {
        filteredFields.push(
          order.user?.displayName.includes(searchTerms.worker)
        );
      }

      if (searchTerms.status) {
        filteredFields.push(order.status.indexOf(searchTerms.status) !== -1);
      }

      return filteredFields.every((v) => v);
    };

    return filterFunction;
  }

  removeOrder(order: Order, event: MouseEvent) {
    event.stopPropagation();
    this.store.dispatch(removeOrder({ order }));
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
