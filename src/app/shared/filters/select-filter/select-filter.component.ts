import { Component, ViewChild, forwardRef, OnInit } from '@angular/core';
import { MatSelect } from '@angular/material/select';
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
    }
  }

  getState(): FilterState {
    const activeValue = this.values.find((value) => value.active);
    return {
      name: this.name,
      value: activeValue !== undefined ? activeValue.value : '',
    };
  }

  updateState(): void {
    this._values.forEach((value) => {
      value.active = value.value === this.select.value;
    });
    this.emitState();
  }
}
