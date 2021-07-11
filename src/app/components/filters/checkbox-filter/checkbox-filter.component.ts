import { OnInit } from '@angular/core';
import { Component, forwardRef } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FilterState } from '../filter-state.model';
import { FilterValue } from '../filter-value.model';
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
export class CheckboxFilterComponent
  extends FilterComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.state.next(this.getState());
  }

  emitState(event: MatCheckboxChange): void {
    console.log('CHECKBOX', event);
    this.state.next(this.getState());
  }

  getState(): FilterState {
    return {
      name: this.name,
      value: this.values
        .filter((value) => value.active)
        .map((value) => value.value),
    };
  }
}
