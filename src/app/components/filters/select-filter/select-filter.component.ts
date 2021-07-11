import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { FiltersComponent } from '../filters.component';
import { FilterState } from '../filter-state.model';

@Component({
  selector: 'select-filter',
  templateUrl: './select-filter.html',
  styleUrls: ['./select-filter.scss'],
  providers: [
    {
      provide: FiltersComponent,
      useExisting: forwardRef(() => SelectFilterComponent),
    },
  ],
})
export class SelectFilterComponent extends FiltersComponent implements OnInit {
  @ViewChild(MatSelect, { static: true }) select!: MatSelect;

  constructor() {
    super();
  }

  ngOnInit(): void {
    const activeFilter = this.filters.find((filter) => filter.active);
    if (activeFilter !== undefined) {
      this.select.value = activeFilter.value;
      this.changeFilter.next(this.getState());
    }
  }

  emitState(event: MatSelectChange): void {
    this.changeFilter.next({
      group: this.group,
      value: event.value,
    });
  }

  getState(): FilterState {
    return {
      group: this.group,
      value: this.select.value,
    };
  }
}
