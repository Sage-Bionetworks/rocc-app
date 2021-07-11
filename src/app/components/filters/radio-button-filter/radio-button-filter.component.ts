import { OnInit } from '@angular/core';
import { Component, ViewChild, forwardRef } from '@angular/core';
import { MatRadioChange, MatRadioGroup } from '@angular/material/radio';
import { FilterState } from '../filter-state.model';
import { FiltersComponent } from '../filters.component';

@Component({
  selector: 'radio-button-filter',
  templateUrl: './radio-button-filter.html',
  styleUrls: ['./radio-button-filter.scss'],
  providers: [
    {
      provide: FiltersComponent,
      useExisting: forwardRef(() => RadioButtonFilterComponent),
    },
  ],
})
export class RadioButtonFilterComponent extends FiltersComponent implements OnInit {
  @ViewChild(MatRadioGroup, { static: true }) radioGroup!: MatRadioGroup;

  constructor() {
    super();
  }

  ngOnInit(): void {
    const activeFilter = this.filters.find((filter) => filter.active);
    if (activeFilter !== undefined) {
      this.radioGroup.value = activeFilter.value;
      this.changeFilter.next(this.getState());
    }
  }

  emitState(event: MatRadioChange): void {
    this.changeFilter.next({
      group: this.group,
      value: event.value,
    });
  }

  getState(): FilterState {
    return {
      group: this.group,
      value: this.radioGroup.value,
    };
  }
}
