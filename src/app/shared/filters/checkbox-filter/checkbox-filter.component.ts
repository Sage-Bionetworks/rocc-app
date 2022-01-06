import { Component, forwardRef } from '@angular/core';
import { FilterState } from '../filter-state.model';
import { FilterComponent } from '../filter.component';

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
export class CheckboxFilterComponent extends FilterComponent {
  getState(): FilterState {
    return {
      name: this.name,
      value: this.values
        .filter((value) => value.active)
        .map((value) => value.value),
    };
  }
}
