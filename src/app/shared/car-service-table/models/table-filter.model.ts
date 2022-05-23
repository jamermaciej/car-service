import { Observable } from 'rxjs';

export interface TableFilter {
    name: string;
    placeholder: string;
    data: Observable<any[]>;
    labelKey: string;
}
