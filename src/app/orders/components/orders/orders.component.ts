import { FlowRoutes } from 'src/app/core/enums/flow';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { getUsers } from 'src/app/admin/store/selectors/users.selectors';
import { UserService } from 'src/app/core/services/user/user.service';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../store';
import * as fromUsers from './../../../admin/store';
import { getOrders } from '../../store/selectors/orders.selectors';
import { Order } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterViewInit {
  flowRoutes = FlowRoutes;
  users$: Observable<User[]>;
  orders$: Observable<Order[]>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns = ['id', 'status'];
  orders = new MatTableDataSource<Order>();

  constructor(private store: Store<fromRoot.State>, private userService: UserService) {

  }

  ngOnInit(): void {
    this.store.select(getOrders).subscribe((orders: Order[]) => {
      this.orders.data = orders;
    });
  }

  ngAfterViewInit() {
    this.orders.sort = this.sort;
    this.orders.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.orders.filter = filterValue.trim().toLowerCase();
  }

}
