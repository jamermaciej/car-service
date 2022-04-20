import { FlowRoutes } from 'src/app/core/enums/flow';
import { getOrdersLoggedUser } from './../../../../orders/store/selectors/orders.selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as fromOrders from './../../../../orders/store';
import { Order } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  flowRoutes = FlowRoutes;
  displayedColumns;
  orders$: Observable<Order[]>;

  constructor(private store: Store<fromOrders.State>) {}

  ngOnInit(): void {
    this.orders$ = this.store.select(getOrdersLoggedUser);
    this.displayedColumns = [
      {
        name: 'orders.table.headers.id',
        dataKey: ['id'],
        position: 'left',
        isSortable: true,
      },
      {
        name: 'orders.table.headers.customer',
        dataKey: ['customer.name', 'customer.surname'],
        position: 'right',
        isSortable: false,
      },
      {
        name: 'orders.table.headers.car',
        dataKey: ['car.brand', 'car.model'],
        position: 'right',
        isSortable: true,
      },
      {
        name: 'orders.table.headers.delivery_date',
        dataKey: ['delivery_date'],
        position: 'right',
        isSortable: false,
      },
      {
        name: 'orders.table.headers.deadline',
        dataKey: ['deadline'],
        position: 'right',
        isSortable: false,
      },
      {
        name: 'orders.table.headers.status',
        dataKey: ['status'],
        position: 'right',
        isSortable: false,
      },
      {
        name: 'orders.table.headers.notes',
        dataKey: ['notes'],
        position: 'right',
        isSortable: false,
      },
      {
        name: 'orders.table.headers.test_drive',
        dataKey: ['test_drive_agree'],
        position: 'right',
        isSortable: false,
      },
    ];
  }
}
