import { TableFilter } from './table-filter.model';

export interface TableFilterConfig {
    defaultFilter: string;
    filteredColumns: FilteredColumn[];
    filters: TableFilter[];
}


interface FilteredColumn {
    label: string;
    field: string;
}
