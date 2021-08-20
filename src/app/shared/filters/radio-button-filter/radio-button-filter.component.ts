import { Component, ViewChild, forwardRef } from '@angular/core';
import { MatRadioChange, MatRadioGroup } from '@angular/material/radio';
import { FilterState } from '../filter-state.model';
import { FilterComponent } from '../filter.component';

@Component({
  selector: 'sage-radio-button-filter',
  templateUrl: './radio-button-filter.html',
  styleUrls: ['./radio-button-filter.scss'],
  providers: [
    {
      provide: FilterComponent,
      useExisting: forwardRef(() => RadioButtonFilterComponent),
    },
  ],
})
export class RadioButtonFilterComponent extends FilterComponent {
  @ViewChild(MatRadioGroup, { static: true }) radioGroup!: MatRadioGroup;

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

  updateState(event: MatRadioChange): void {
    this._values.forEach((value) => {
      value.active = value.value === event.value;
    });
    this.emitState();
  }
}
