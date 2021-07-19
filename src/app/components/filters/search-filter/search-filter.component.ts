import { Component, forwardRef } from '@angular/core';
import { FilterState } from '../filter-state.model';
import { FilterComponent } from '../filter.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'sage-search-filter',
  templateUrl: './search-filter.html',
  styleUrls: ['./search-filter.scss'],
  providers: [
    {
      provide: FilterComponent,
      useExisting: forwardRef(() => SearchFilterComponent),
    },
  ],
})
export class SearchFilterComponent extends FilterComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  private searchSub!: Subscription;

  constructor(private formBuilder: FormBuilder) {
    super();
    this.searchForm = this.formBuilder.group({
      search: ['', []],
    });
  }

  ngOnInit(): void {
    this.searchSub = this.searchForm.controls.search.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(
        (_term) => this.emitState(),
        (err) => console.log(err)
      );
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }

  getState(): FilterState {
    return {
      name: this.name,
      value: this.searchForm.value.search,
    };
  }
}
