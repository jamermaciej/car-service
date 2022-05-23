import { Observable } from 'rxjs';
import { TableColumnType } from 'src/app/core/enums/table-column-type';

export interface TableColumn {
    name?: string;
    dataKey?: string[];
    position?: 'right' | 'left';
    isSortable?: boolean;
    type: TableColumnType;
    options?: Observable<any[]>;
}
