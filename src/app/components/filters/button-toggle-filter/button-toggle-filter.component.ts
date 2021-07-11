import { OnInit } from '@angular/core';
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
export class ButtonToggleFilterComponent
  extends FilterComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.state.next(this.getState());
  }

  emitState(event: MatButtonToggleChange): void {
    this.state.next({
      name: this.name,
      value: event.value,
    });
  }

  getState(): FilterState {
    return {
      name: this.name,
      value: this.values
        .filter((value) => value.active)
        .map((value) => value.value),
    };
  }

  getValueIcon(value: FilterValue): string {
    return (value as ButtonToggleFilterValue).icon;
  }
}
