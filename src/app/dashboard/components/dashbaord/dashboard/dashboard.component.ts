import { FlowRoutes } from 'src/app/core/enums/flow';
import { getOrder, getOrdersLoggedUser } from './../../../../orders/store/selectors/orders.selectors';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as fromOrders from './../../../../orders/store';
import { Order } from 'src/app/shared/models/order.model';
import { TableColumnType } from 'src/app/core/enums/table-column-type';
import { Status } from 'src/app/shared/models/status.model';
import { getStatuses } from 'src/app/admin/store/selectors/statuses.selectors';
import { removeOrder, updateOrder, updateStatus } from './../../../../orders/store';
import { Router } from '@angular/router';
import { LocalizeRouterService } from '@penleychan/ngx-transloco-router';
import { take, takeUntil } from 'rxjs/operators';
import { Sort } from '@angular/material/sort';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private store: Store<fromOrders.State>,  private localize: LocalizeRouterService) {}
  destroySubject$: Subject<any> = new Subject();
  flowRoutes = FlowRoutes;
  displayedColumns;
  orders: Order[];
  statuses$: Observable<Status[]>;
  workers$: Observable<User[]>;

  filterConfig;

  orderButtonSettings = [
    {
      // title: 'Open',
      icon: 'edit',
      params: ['id'],
      func: (id: number) => {
        const translatedRoute = this.localize.translateRoute([this.flowRoutes.ORDERS, id]);
        this.router.navigate([...translatedRoute]);
      }
    },
    {
      // title: 'Open',
      icon: 'delete',
      params: ['id'],
      func: (id: number) => {
        this.store.dispatch(removeOrder({ id }));
      }
    }
  ];

  ngOnInit(): void {
    this.store
      .select(getOrdersLoggedUser)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(orders => this.orders = orders);

    this.statuses$ = this.store.select(getStatuses);

    this.filterConfig = {
      defaultFilter: 'default',
      filteredColumns: [
        {
          label: 'All columns',
          field: 'default',
        },
        {
          label: 'Status',
          field: 'status'
        },
        {
          label: 'Notes',
          field: 'notes',
        }
      ],
      filters: [
        {
          name: 'status',
          placeholder: 'Filter by status',
          data: this.statuses$,
          labelKey: 'label'
        },
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
  }

  // editOrder(order: Order) {
  //   const translatedRoute = this.localize.translateRoute([this.flowRoutes.ORDERS, order.id]);
  //   this.router.navigate([...translatedRoute]);
  // }

  editOrder(event: MouseEvent, id: number) {
    // event.stopPropagation();
    const translatedRoute = this.localize.translateRoute([this.flowRoutes.ORDERS, id]);
    this.router.navigate([...translatedRoute]);
  }

  removeOrder({ id, event }) {
    event.stopPropagation();
    this.store.dispatch(removeOrder({ id }));
  }

  onSelect(event) {
    const status = event.value;
    const { id } = event;
    this.store
      .select(getOrder, { id })
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

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
