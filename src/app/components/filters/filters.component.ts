import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from './filter.model';
import { ActiveFilter } from './active-filter.model';

const emptyActiveFilter: ActiveFilter = {
  value: '',
  group: ''
};

@Component({
  template: ''
})
export abstract class FiltersComponent {
    @Input() group!: string;
    _filters: Filter[] = [];
    changeFilter = new BehaviorSubject<ActiveFilter>(emptyActiveFilter);

    constructor() { }

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
