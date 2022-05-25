import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCustomers } from '../../store/selectors/customers.selectors';
import * as fromCustomers from './../../store';
import { Customer } from 'src/app/shared/models/customer.model';
import { FlowRoutes } from 'src/app/core/enums/flow';
import { Sort } from '@angular/material/sort';
import { filter } from 'rxjs/operators';
import { removeCustomer } from '../../store';
import { TableColumn } from 'src/app/shared/car-service-table/models/table-column.model';
import { TableColumnType } from 'src/app/core/enums/table-column-type';
import { Router } from '@angular/router';
import { LocalizeRouterService } from '@penleychan/ngx-transloco-router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  flowRoutes = FlowRoutes;
  customers$: Observable<Customer[]>;
  displayedColumns: TableColumn[];
  customers: Customer[];

  constructor(private store: Store<fromCustomers.State>,
              private router: Router,
              private localize: LocalizeRouterService
            ) {}

  ngOnInit(): void {
    this.store
      .select(getCustomers)
      .pipe(filter((data) => !!data))
      .subscribe((users: Customer[]) => {
        this.customers = users;
      });

    this.displayedColumns = [
        {
          name: 'customer.table.headers.id',
          dataKey: ['id'],
          position: 'left',
          isSortable: true,
          type: TableColumnType.TEXT
        },
        {
          name: 'customer.table.headers.name',
          dataKey: ['name'],
          position: 'right',
          isSortable: false,
          type: TableColumnType.TEXT
        },
        {
          name: 'customer.table.headers.surname',
          dataKey: ['surname'],
          position: 'right',
          isSortable: false,
          type: TableColumnType.TEXT
        },
        {
          name: 'customer.table.headers.phoneNumber',
          dataKey: ['phoneNumber'],
          position: 'right',
          isSortable: false,
          type: TableColumnType.PHONE_NUMBER
        },
        {
          name: 'customer.table.headers.idNumber',
          dataKey: ['idNumber'],
          position: 'right',
          isSortable: false,
          type: TableColumnType.TEXT
        },
        {
          name: 'customer.table.headers.email',
          dataKey: ['email'],
          position: 'right',
          isSortable: true,
          type: TableColumnType.EMAIL
        },
        {
          name: 'customer.table.headers.address',
          // dataKey: ['address.city', 'address.street', 'address.postcode', 'address.province'],
          dataKey: ['addressHtml'],
          position: 'right',
          isSortable: false,
          type: TableColumnType.ADDRESS,
        },
        {
          position: 'right',
          type: TableColumnType.ACTION
        },
      ];
  }

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    const customersCopy = [...this.customers];
    if (sortParameters.direction === 'asc') {
      this.customers = customersCopy.sort((a: Customer, b: Customer) => {
        if (a[keyName] >= b[keyName]) {
          return 1;
        } else {
          return -1;
        }
      });
    } else if (sortParameters.direction === 'desc') {
      this.customers = customersCopy.sort((a: Customer, b: Customer) => {
        if (a[keyName] <= b[keyName]) {
          return 1;
        } else {
          return -1;
        }
      });
    } else {
      return this.customers;
    }
  }

  removeCustomer(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.store.dispatch(removeCustomer({ id }));
  }

  editCustomer(event: MouseEvent, id: number) {
    const translatedRoute = this.localize.translateRoute([this.flowRoutes.CUSTOMERS, id]);
    this.router.navigate([...translatedRoute]);
  }
}
