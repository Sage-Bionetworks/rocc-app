import { Component, forwardRef } from '@angular/core';
import { FilterState } from '../filter-state.model';
import { FilterComponent } from '../filter.component';

@Component({
  selector: 'sage-date-range-filter',
  templateUrl: './date-range-filter.html',
  styleUrls: ['./date-range-filter.scss'],
  providers: [
    {
      provide: FilterComponent,
      useExisting: forwardRef(() => DateRangeFilterComponent),
    },
  ],
})
export class DateRangeFilterComponent extends FilterComponent {
  constructor() {
    super();
  }

  getState(): FilterState {
    return {
      name: this.name,
      value: ''
      // value: this.values
      //   .filter((value) => value.active)
      //   .map((value) => value.value),
    };
  }
}
