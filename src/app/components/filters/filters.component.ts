import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from './filter.model';
import { FilterState } from './filter-state.model';

export const emptyFilterState: FilterState = {
  group: '',
  value: ''
};

@Component({
  template: '',
})
export abstract class FiltersComponent {
  /* Filter name */
  @Input() group: string = '';
  /* The available value that the query parameter can takes */
  private _filters: Filter[] = [];
  /* Emits each time the selected filter value changes. */
  changeFilter = new BehaviorSubject<FilterState>(emptyFilterState);

  constructor() {}

  getSelectedFilter(): Observable<FilterState> {
    return this.changeFilter.asObservable();
  }

  get filters(): Filter[] {
    return this._filters;
  }

  @Input()
  set filters(filters: Filter[]) {
    this._filters = filters;
    this.changeFilter.next(this.getState());
  }

  protected abstract getState(): FilterState;
}
