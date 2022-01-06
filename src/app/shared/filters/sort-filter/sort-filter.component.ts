import { Component, OnInit, forwardRef } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FilterState } from '../filter-state.model';
import { FilterComponent } from '../filter.component';

@Component({
  selector: 'sage-sort-filter',
  templateUrl: './sort-filter.component.html',
  styleUrls: ['./sort-filter.component.scss'],
  providers: [
    {
      provide: FilterComponent,
      useExisting: forwardRef(() => SortFilterComponent),
    },
  ],
})
export class SortFilterComponent extends FilterComponent implements OnInit {
  activeValue: string = '';

  ngOnInit(): void {
    const activeValues = this.values.filter((value) => value.active === true);
    this.activeValue = activeValues[0].value as string;
  }

  getState(): FilterState {
    const activeValues = this.values.filter((value) => value.active === true);
    return {
      name: this.name,
      value: activeValues.map((value) => value.value),
    };
  }

  updateState(event: MatSelectChange): void {
    this._values.forEach((value) => {
      value.active = value.value === event.value;
    });
    this.emitState();
  }
}
