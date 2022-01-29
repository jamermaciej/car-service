import { Observable } from 'rxjs';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCustomers } from '../../store/selectors/customers.selectors';
import * as fromCustomers from './../../store';
import { Customer } from 'src/app/shared/models/customer.model';
import { FlowRoutes } from 'src/app/core/enums/flow';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators';
import { removeCustomer } from '../../store';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit, AfterViewInit {
  flowRoutes = FlowRoutes;
  customers$: Observable<Customer[]>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns = [
    'id',
    'name',
    'surname',
    'phoneNumber',
    'idNumber',
    'email',
    'address',
    'actions',
  ];
  customers = new MatTableDataSource<Customer>();

  constructor(private store: Store<fromCustomers.State>) {}

  ngOnInit(): void {
    this.store
      .select(getCustomers)
      .pipe(filter((data) => !!data))
      .subscribe((users: Customer[]) => {
        this.customers.data = users;
      });
  }

  update() {
    // this.customerService.updateCustomer().subscribe();
  }

  ngAfterViewInit() {
    this.customers.sort = this.sort;
    this.customers.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.customers.filter = filterValue.trim().toLowerCase();
  }

  removeCustomer(customer: Customer, event: MouseEvent) {
    event.stopPropagation();
    this.store.dispatch(removeCustomer({ customer }));
  }
}
