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
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  flowRoutes = FlowRoutes;
  displayedColumns = ['id', 'customer_id', 'car_id', 'delivery_date', 'deadline', 'status', 'notes', 'test_drive_agree'];
  orders$: Observable<Order[]>;

  constructor(private store: Store<fromOrders.State>) { }

  ngOnInit(): void {
    this.orders$ = this.store.select(getOrdersLoggedUser);
  }

}
