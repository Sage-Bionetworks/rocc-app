import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { FilterComponent } from '../filter.component';
import { FilterState } from '../filter-state.model';

@Component({
  selector: 'sage-select-filter',
  templateUrl: './select-filter.html',
  styleUrls: ['./select-filter.scss'],
  providers: [
    {
      provide: FilterComponent,
      useExisting: forwardRef(() => SelectFilterComponent),
    },
  ],
})
export class SelectFilterComponent extends FilterComponent implements OnInit {
  @ViewChild(MatSelect, { static: true }) select!: MatSelect;

  constructor() {
    super();
  }

  ngOnInit(): void {
    const activeValue = this.values.find((value) => value.active);
    if (activeValue !== undefined) {
      this.select.value = activeValue.value;
      this.state.next(this.getState());
    }
  }

  emitState(event: MatSelectChange): void {
    this.state.next({
      name: this.name,
      value: event.value,
    });
  }

  getState(): FilterState {
    return {
      name: this.name,
      value: this.select.value,
    };
  }
}
