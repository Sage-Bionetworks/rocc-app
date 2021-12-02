import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { FilterState } from '../filter-state.model';
import { FilterValue } from '../filter-value.model';
import { FilterComponent } from '../filter.component';

@Component({
  selector: 'sage-search-dropdown-filter',
  templateUrl: './search-dropdown-filter.component.html',
  styleUrls: ['./search-dropdown-filter.component.scss'],
  providers: [
    {
      provide: FilterComponent,
      useExisting: forwardRef(() => SearchDropdownFilterComponent),
    },
  ],
})
export class SearchDropdownFilterComponent
  extends FilterComponent
  implements OnInit
{
  cities!: FilterValue[];

  activeValue!: FilterValue[];

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
}
