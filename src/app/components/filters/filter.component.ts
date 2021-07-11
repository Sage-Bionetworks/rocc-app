import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterValue } from './filter-value.model';
import { FilterState } from './filter-state.model';

export const emptyFilterState: FilterState = {
  name: '',
  value: ''
};

@Component({
  template: '',
})
export abstract class FilterComponent {
  /* Filter name */
  @Input() name: string = '';
  /* The available value that the query parameter can takes */
  private _values: FilterValue[] = [];
  /* Emits each time the selected filter value changes. */
  changeFilter = new BehaviorSubject<FilterState>(emptyFilterState);

  constructor() {}

  getSelectedFilter(): Observable<FilterState> {
    return this.changeFilter.asObservable();
  }

  get values(): FilterValue[] {
    return this._values;
  }

  @Input()
  set values(values: FilterValue[]) {
    this._values = values;
    this.changeFilter.next(this.getState());
  }

  protected abstract getState(): FilterState;
}
