import { Input, OnInit } from '@angular/core';
import { Component, forwardRef } from '@angular/core';
import { FilterState } from '../filter-state.model';
import { FilterComponent } from '../filter.component';
import { CheckboxFilterValue } from './checkbox-filter-value';

@Component({
  selector: 'sage-checkbox-filter',
  templateUrl: './checkbox-filter.html',
  styleUrls: ['./checkbox-filter.scss'],
  providers: [
    {
      provide: FilterComponent,
      useExisting: forwardRef(() => CheckboxFilterComponent),
    },
  ],
})
export class CheckboxFilterComponent extends FilterComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}

  getState(): FilterState {
    return {
      name: this.name,
      value: this.values
        .filter((value) => value.active)
        .map((value) => value.value),
    };
  }

  @Input()
  set values(values: CheckboxFilterValue[]) {
    this._values = values;
    this.emitState();
  }

  get values(): CheckboxFilterValue[] {
    return this._values as CheckboxFilterValue[];
  }

  emitState(): void {
    this.state.next(this.getState());
  }
}
