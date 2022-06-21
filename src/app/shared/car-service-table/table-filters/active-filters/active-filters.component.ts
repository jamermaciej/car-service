import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-active-filters',
  templateUrl: './active-filters.component.html',
  styleUrls: ['./active-filters.component.scss']
})
export class ActiveFiltersComponent {
  @Input() filterValues: {};
  @Output() clearFilter: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  onClearFilter(field: string) {
    this.clearFilter.emit(field);
  }

}
