import { Component, ViewChild, forwardRef } from '@angular/core';
import { MultiSelect } from 'primeng/multiselect';
import { FilterState } from '../filter-state.model';
import { FilterValue } from '../filter-value.model';
import { FilterComponent } from '../filter.component';
import { Avatar } from '@sage-bionetworks/sage-angular';
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
export class SearchDropdownFilterComponent extends FilterComponent {
  @ViewChild(MultiSelect, { static: true }) select!: MultiSelect;

  activeValues!: FilterValue[];
  constructor() {
    super();
  }

  getState(): FilterState {
    this.activeValues = this.values.filter((value) => value.active == true);
    return {
      name: this.name,
      value: this.activeValues.map((value) => value.value),
    };
  }

  updateState(): void {
    this._values.forEach((value) => {
      value.active = this.select.value.includes(value);
    });
    console.log(this.values);
    this.emitState();
  }

  getAvatar(value: FilterValue): Avatar {
    return {
      name: value.title,
      src: value.avatarUrl ? value.avatarUrl : '',
      size: 32,
    };
  }
}
