import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Role } from './../../../core/enums/roles';
import { getUser } from './../../../store/selectors/auth.selectors';
import { removeOrder, updateOrder, updateStatus } from './../../store/actions/orders.actions';
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
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
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
import { TableColumnType } from 'src/app/core/enums/table-column-type';
import { Router } from '@angular/router';
import { LocalizeRouterService } from '@penleychan/ngx-transloco-router';
import { TableColumn } from 'src/app/shared/car-service-table/models/table-column.model';
import { TableFilterConfig } from 'src/app/shared/car-service-table/models/table-filter-config.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  destroySubject$: Subject<any> = new Subject();
  flowRoutes = FlowRoutes;
  users$: Observable<User[]>;
  orders$: Observable<Order[]>;
  orders: Order[];
  statuses$: Observable<Status[]>;

  displayedColumns: TableColumn[];

  workers$: Observable<User[]>;

  filterConfig: TableFilterConfig;

  constructor(
    private store: Store<fromRoot.State>,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private localize: LocalizeRouterService
  ) {}

  ngOnInit(): void {
    this.workers$ = this.store.select(getUsers);

    this.statuses$ = this.store.select(getStatuses);

    this.filterConfig = {
      defaultFilter: 'default',
      filteredColumns: [
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
        }
      ],
      filters: [
        {
          name: 'user',
          placeholder: 'Filter by worker',
          data: this.workers$,
          labelKey: 'displayName'
        },
        {
          name: 'status',
          placeholder: 'Filter by status',
          data: this.statuses$,
          labelKey: 'label'
        }
      ]
    };


    this.displayedColumns = [
      {
        name: 'orders.table.headers.id',
        dataKey: ['id'],
        position: 'left',
        isSortable: true,
        type: TableColumnType.TEXT
      },
      {
        name: 'orders.table.headers.customer',
        dataKey: ['customer.name', 'customer.surname'],
        position: 'right',
        isSortable: false,
        type: TableColumnType.TEXT
      },
      {
        name: 'orders.table.headers.car',
        dataKey: ['car.brand', 'car.model'],
        position: 'right',
        isSortable: false,
        type: TableColumnType.TEXT
      },
      {
        name: 'orders.table.headers.worker',
        dataKey: ['user.displayName'],
        position: 'right',
        isSortable: false,
        type: TableColumnType.TEXT
      },
      {
        name: 'orders.table.headers.delivery_date',
        dataKey: ['delivery_date'],
        position: 'right',
        isSortable: false,
        type: TableColumnType.DATE
      },
      {
        name: 'orders.table.headers.deadline',
        dataKey: ['deadline'],
        position: 'right',
        isSortable: true,
        type: TableColumnType.DATE
      },
      {
        name: 'orders.table.headers.status',
        dataKey: ['status'],
        position: 'right',
        isSortable: false,
        type: TableColumnType.SELECT,
        options: this.statuses$
      },
      {
        name: 'orders.table.headers.notes',
        dataKey: ['notes'],
        position: 'right',
        isSortable: false,
        type: TableColumnType.TEXT
      },
      {
        name: 'orders.table.headers.test_drive',
        dataKey: ['test_drive_agree'],
        position: 'right',
        isSortable: true,
        type: TableColumnType.CHECKMARK
      },
      {
        position: 'right',
        type: TableColumnType.ACTION
      },
    ];

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

        orders = [...orders].sort(
          (a, b) => sortOrder.indexOf(a.status) - sortOrder.indexOf(b.status)
        );

        this.orders = orders;
      });

    // this.store.select(getUser).subscribe((user) => {
    //   const name = user.displayName;
    //   const roles = user.roles;

    //   if (roles.includes(Role.ADMIN)) {
    //     this.defaulWorker = name;
    //     this.filterValues.worker = name;
    //     this.filterGroup.get('worker').setValue(name);
    //     this.orders.filter = JSON.stringify(this.filterValues);
    //   }
    // });
  }

  getCustomerData(id: number): Observable<string> {
    return this.store.select(getCustomer(id)).pipe(
      filter((customer) => !!customer),
      map((customer) => `${customer.name} ${customer.surname}`)
    );
  }

  getCarData(id: number): Observable<string> {
    return this.store.select(getCar(id)).pipe(
      filter((car) => !!car),
      map((car) => `${car.model} ${car.brand}`)
    );
  }

  // getUserData(uid: string) {
  //   return this.store.select(getUser, uid).pipe(
  //     filter((user) => !!user),
  //     map((user) => `${user.displayName}`)
  //   );
  // }

  editOrder(event: MouseEvent, id: number) {
    const translatedRoute = this.localize.translateRoute([this.flowRoutes.ORDERS, id]);
    this.router.navigate([...translatedRoute]);
  }

  updateOrder(status: string, id: number) {
    this.store
      .select(getOrder(id))
      .pipe(take(1), takeUntil(this.destroySubject$))
      .subscribe((order) => {
        const newOrder = {
          ...order,
          status,
        };
        this.store.dispatch(updateOrder({ order: newOrder }));
      });
  }

  onSelect(event) {
    const status = event.value;
    const { id } = event;
    this.store
      .select(getOrder(id))
      .pipe(take(1))
      .subscribe((order) => {
        const newOrder = {
          ...order,
          status,
        };
        this.store.dispatch(updateStatus({ order: newOrder }));
      });
  }

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.orders = this.orders.sort((a: Order, b: Order) => {
        if (a[keyName] >= b[keyName]) {
          return 1;
        } else {
          return -1;
        }
      });
    } else if (sortParameters.direction === 'desc') {
      this.orders = this.orders.sort((a: Order, b: Order) => {
        if (a[keyName] <= b[keyName]) {
          return 1;
        } else {
          return -1;
        }
      });
    } else {
      return this.orders;
    }
  }

  removeOrder(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.store.dispatch(removeOrder({ id }));
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
