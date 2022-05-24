import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getStatuses } from 'src/app/admin/store/selectors/statuses.selectors';
import { getUsers } from 'src/app/admin/store/selectors/users.selectors';
import { FlowRoutes } from 'src/app/core/enums/flow';
import { TableColumnType } from 'src/app/core/enums/table-column-type';
import { Status } from '../models/status.model';
import { User } from '../models/user.model';
import * as fromRoot from './../../store';
import { TableColumn } from './models/table-column.model';

@Component({
  selector: 'app-car-service-table',
  templateUrl: './car-service-table.component.html',
  styleUrls: ['./car-service-table.component.scss'],
})
export class CarServiceTableComponent implements OnInit, AfterViewInit {
  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns: string[];
  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;

  @ContentChild('tdAction', { static: false })
  tdAction: TemplateRef<any>;

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: TableColumn[];
  @Input() rowActionIcon: string;
  @Input() deleteActionIcon: string;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];

  @Input() buttons: [];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectOption: EventEmitter<any> = new EventEmitter<any>();

  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  type = TableColumnType;
  flowRoutes = FlowRoutes;

  filterGroup: FormGroup;

  filterValues: any = {
    default: ''
  };

  workers$: Observable<User[]>;

  filteredColumn: string;

  @Input() filterConfig: {};

  constructor(private fb: FormBuilder, private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    // const columnNames = this.tableColumns.filter(tableColumn => !!tableColumn.name).map(
    //   (tableColumn: TableColumn) => tableColumn.name
    // );
    // if (this.rowActionIcon) {
    //   this.displayedColumns = [...columnNames, this.rowActionIcon];
    // } else if (this.deleteActionIcon) {
    //   this.displayedColumns = [...columnNames, this.deleteActionIcon];
    // } else {
    //   this.displayedColumns = columnNames;
    // }

    const group = {
      default: ''
    };

    if (this.filterConfig) {
      this.filterConfig['filters'].forEach(filter => {
        group[filter.name] = new FormControl('');
        this.filterValues[filter.name] = '';
      });
    }

    this.filterGroup = this.fb.group(group);

    this.workers$ = this.store.select(getUsers);

    this.tableDataSource.filterPredicate = this.createFilter();
    this.fieldListener();
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;

    setTimeout(() => {
      const columnNames = this.tableColumns.filter(tableColumn => !!tableColumn.name).map(
        (tableColumn: TableColumn) => tableColumn.name
      );
      if (this.rowActionIcon) {
        this.displayedColumns = [...columnNames, this.rowActionIcon];
      } else if (this.deleteActionIcon) {
        this.displayedColumns = [...columnNames, this.deleteActionIcon];
      } else if (this.tdAction) {
        this.displayedColumns = [...columnNames, 'actions'];
      } else {
        this.displayedColumns = columnNames;
      }
    });
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  sortTable(sortParameters: Sort) {
    sortParameters.active = this.tableColumns.find(
      (column) => column.name === sortParameters.active
    ).dataKey[0];
    this.sort.emit(sortParameters);
  }

  emitRowAction(row: any) {
    this.rowAction.emit(row);
  }

  emitDeleteAction(id: number, event: MouseEvent) {
    this.deleteAction.emit({ id, event });
  }

  emitSelectOption(value: string, id: number) {
    this.selectOption.emit({ value, id });
  }

  buttonClick(element, func: any, values, event) {
    func(...values.map(val => element[val]));
  }

  onClearFilter(field: string) {
    this.filterGroup.get(field).setValue(null);
    this.filterValues[field] = '';
    this.tableDataSource.filter = JSON.stringify(this.filterValues);
  }

  changeFilteredColumn(event: MatSelect) {
    this.filterValues = {
      ...this.filterValues,
      [event.value]: '',
    };
    this.filteredColumn = event.value;

    this.tableDataSource.filter = JSON.stringify(this.filterValues);
  }

  private fieldListener() {
    Object.keys(this.filterGroup.controls).forEach(key => {
      this.filterGroup.controls[key].valueChanges.subscribe(value => {
        this.filterValues[key] = value;
        this.tableDataSource.filter = JSON.stringify(this.filterValues);
      });
    });
  }

  private createFilter(): (data, filter: string) => boolean {
    const filterFunction = (data, f: string): boolean => {
      const searchTerms = JSON.parse(f);
      const filteredFields = [];

      if (!Object.values(searchTerms).some((t) => t)) return true;

      if (searchTerms.default) {
        const v = searchTerms.default.trim();
        const tempArray = [];

        if (this.filteredColumn && this.filteredColumn !== 'default') {
          const k = this.filteredColumn.split('.');
          if (!data[k[0]]) return;
          if (k[1]) {
            filteredFields.push(data[k[0]][k[1]].toLowerCase().includes(v));
          } else {
            filteredFields.push(data[k[0]].toLowerCase().includes(v));
          }
        } else {
          for (const key of this.tableColumns) {

            if (key.dataKey) {
              if (key.dataKey[1]) {
                const column = key.dataKey[1].split('.')[0];
                const names = [];

                for (const k of key.dataKey) {
                  names.push(k.split('.')[1]);
                }

                for (const n of names) {
                  tempArray.push(data[column][n] && data[column][n].toLowerCase && data[column][n].toLowerCase().includes(v));

                }
              } else {
                if (typeof data[key.dataKey[0]] === 'number') {
                  tempArray.push(data[key.dataKey[0]] === Number(v));
                } else {
                  tempArray.push(data[key.dataKey[0]] &&
                                data[key.dataKey[0]].toLowerCase &&
                                data[key.dataKey[0]].toLowerCase().includes(v));
                }
              }
            }
          }

          filteredFields.push(tempArray.some((value) => !!value));
        }
      }

      for (const term of this.filterConfig['filters']) {
        if (term.name && term.name !== 'default') {

          if (typeof data[term.name] === 'object') {
            filteredFields.push(
              data[term.name][term.labelKey].indexOf(searchTerms[term.name]) !== -1
            );
          } else {
            filteredFields.push(
              data[term.name].indexOf(searchTerms[term.name]) !== -1
            );
          }
        }
      }

      return filteredFields.every((v) => v);
    };

    return filterFunction;
  }
}
