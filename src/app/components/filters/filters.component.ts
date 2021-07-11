import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from './filter.model';
import { ActiveFilter } from './active-filter.model';

export const emptyActiveFilter: ActiveFilter = {
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
  changeFilter = new BehaviorSubject<ActiveFilter>(emptyActiveFilter);

  constructor() {}

  getSelectedFilter(): Observable<ActiveFilter> {
    return this.changeFilter.asObservable();
  }

  get filters(): Filter[] {
    return this._filters;
  }

  @Input()
  set filters(filters: Filter[]) {
    this._filters = filters;
    this.changeFilter.next(this.getSelection());
  }

  protected abstract getSelection(): ActiveFilter;
}
