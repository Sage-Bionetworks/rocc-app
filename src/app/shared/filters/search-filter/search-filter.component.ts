import { Component, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { FilterState } from '../filter-state.model';
import { FilterComponent } from '../filter.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
export class SearchFilterComponent
  extends FilterComponent
  implements OnInit, OnDestroy {
  searchForm: FormGroup;
  private searchSub!: Subscription;

  constructor(private formBuilder: FormBuilder) {
    super();
    this.searchForm = this.formBuilder.group({
      search: ['', []],
    });
  }

  ngOnInit(): void {
    // TODO: Add validation
    const searchTerms = this.values[0].value as string;
    this.searchForm.get('search')?.setValue(searchTerms);

    this.searchSub = this.searchForm.controls.search.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(
        (term) => {
          this.values[0].value = term;
          this.emitState();
        },
        (err) => console.log(err)
      );
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
    this.values[0].value = '';
  }

  getState(): FilterState {
    const activeValue = this.values.find((value) => value.active);
    return {
      name: this.name,
      value: activeValue !== undefined ? activeValue.value : '',
    };
  }
}
