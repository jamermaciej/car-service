import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getStatuses } from 'src/app/admin/store/selectors/statuses.selectors';
import { getUsers } from 'src/app/admin/store/selectors/users.selectors';
import { Status } from '../../models/status.model';
import { User } from '../../models/user.model';
import * as fromRoot from './../../../store';

@Component({
  selector: 'app-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFiltersComponent implements OnInit {
  @Input() data: MatTableDataSource<[]>;
  workers$: Observable<User[]>;
  statuses$: Observable<Status[]>;

  filterGroup: FormGroup;

  filterValues: any = {
    worker: '',
    status: '',
    default: '',
  };

  defaulFilteredColumn = 'default';

  filteredColumn;

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

  constructor(private fb: FormBuilder, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.filterGroup = this.fb.group({
      worker: '',
      status: '',
      default: '',
    });

    this.workers$ = this.store.select(getUsers);
    this.statuses$ = this.store.select(getStatuses);

    this.data.filterPredicate = this.createFilter();
    this.fieldListener();
  }

  private createFilter(): (data, filter: string) => boolean {
    const filterFunction = (data, f: string): boolean => {
      const searchTerms = JSON.parse(f);
      const filteredFields = [];

      if (!Object.values(searchTerms).some((t) => t)) return true;

      if (searchTerms.default) {
        const v = searchTerms.default.trim();
        if (this.filteredColumn && this.filteredColumn !== 'default') {
          const k = this.filteredColumn.split('.');
          if (!data[k[0]]) return;
          if (k[1]) {
            filteredFields.push(data[k[0]][k[1]].toLowerCase().includes(v));
          } else {
            filteredFields.push(data[k[0]].toLowerCase().includes(v));
          }
        } else {
          filteredFields.push(
            data.id === Number(v) ||
              data.user.displayName?.toLowerCase().includes(v) ||
              data.status.toLowerCase().includes(v) ||
              data.notes.toLowerCase().includes(v) ||
              data.car?.brand.toLowerCase().includes(v) ||
              data.car?.model.toLowerCase().includes(v) ||
              data.customer?.name.toLowerCase().includes(v) ||
              data.customer?.surname.toLowerCase().includes(v)
          );
        }
      }

      if (searchTerms.worker) {
        filteredFields.push(
          data.user.displayName?.includes(searchTerms.worker)
        );
      }

      if (searchTerms.status) {
        filteredFields.push(data.status.indexOf(searchTerms.status) !== -1);
      }

      return filteredFields.every((v) => v);
    };

    return filterFunction;
  }

  private fieldListener() {
    this.filterGroup.get('worker').valueChanges.subscribe((worker) => {
      this.filterValues.worker = worker;
      this.data.filter = JSON.stringify(this.filterValues);
    });
    this.filterGroup.get('status').valueChanges.subscribe((status) => {
      this.filterValues.status = status;
      this.data.filter = JSON.stringify(this.filterValues);
    });
    this.filterGroup.get('default').valueChanges.subscribe((v) => {
      this.filterValues.default = v;
      this.data.filter = JSON.stringify(this.filterValues);
    });
  }

  clearFilter(field: string) {
    this.filterGroup.get(field).setValue(null);
    this.filterValues[field] = '';
    this.data.filter = JSON.stringify(this.filterValues);
  }

  changeFilteredColumn(event: MatSelect) {
    this.filterValues = {
      ...this.filterValues,
      [event.value]: '',
    };
    this.filteredColumn = event.value;

    this.data.filter = JSON.stringify(this.filterValues);
  }
}
