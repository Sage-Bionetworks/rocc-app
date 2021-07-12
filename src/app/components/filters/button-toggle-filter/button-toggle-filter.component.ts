import { Component, forwardRef } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { FilterState } from '../filter-state.model';
import { FilterValue } from '../filter-value.model';
import { FilterComponent } from '../filter.component';
import { ButtonToggleFilterValue } from './button-toggle-filter-value';

@Component({
  selector: 'sage-button-toggle-filter',
  templateUrl: './button-toggle-filter.html',
  styleUrls: ['./button-toggle-filter.scss'],
  providers: [
    {
      provide: FilterComponent,
      useExisting: forwardRef(() => ButtonToggleFilterComponent),
    },
  ],
})
export class ButtonToggleFilterComponent extends FilterComponent {
  constructor() {
    super();
  }

  getState(): FilterState {
    const activeValue = this.values.find((value) => value.active);
    return {
      name: this.name,
      value: activeValue !== undefined ? activeValue.value : '',
    };
  }

  updateState(event: MatButtonToggleChange): void {
    this._values.forEach((value) => {
      value.active = value.value == event.value;
    });
    this.emitState();
  }

  getValueIcon(value: FilterValue): string {
    return (value as ButtonToggleFilterValue).icon;
  }
}
