import { Component, forwardRef } from "@angular/core";
import { ActiveFilter } from "../active-filter.model";
import { FiltersComponent } from "../filters.component";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "search-filter",
  templateUrl: "./search-filter.html",
  styleUrls: ["./search-filter.scss"],
  providers: [
    {
      provide: FiltersComponent,
      useExisting: forwardRef(() => SearchFilterComponent),
    },
  ],
})
export class SearchFilterComponent extends FiltersComponent {
  searchForm: FormGroup;
  private searchSub!: Subscription;

  constructor(private formBuilder: FormBuilder) {
    super();
    this.searchForm = this.formBuilder.group({
      search: ['', []],
    });
  }

  ngOnInit() {
    this.changeFilter.next(this.getSelection());
    this.searchSub = this.searchForm.controls.search.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(
        (term) => this.changeFilter.next(this.getSelection()),
        (err) => console.log(err)
      );
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
  }

  getSelection(): ActiveFilter {
    return {
      group: this.group,
      value: this.searchForm.value.search,
    };
  }

  emitSearchTerms(): void {
    this.changeFilter.next(this.getSelection());
  }
}
