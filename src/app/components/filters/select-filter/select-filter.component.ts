import { Component, OnInit, ViewChild, forwardRef } from "@angular/core";
import { MatSelect, MatSelectChange } from "@angular/material/select";
import { FiltersComponent } from "../filters.component";
import { ActiveFilter } from "../active-filter.model";

@Component({
  selector: 'select-filter',
  templateUrl: './select-filter.html',
  styleUrls: ['./select-filter.scss'],
  providers: [
    {
      provide: FiltersComponent,
      useExisting: forwardRef(() => SelectFilterComponent),
    },
  ],
})
export class SelectFilterComponent extends FiltersComponent implements OnInit {
  // TODO Rename variable (using prefix my is a bad practice: not descriptive)
  @ViewChild(MatSelect, { static: true }) mySelect!: MatSelect;

  constructor() {
    super();
  }

  ngOnInit() {
    let activeFilter = this.filters.find(filter => filter.active);
    if (activeFilter !== undefined) {
      this.mySelect.value = activeFilter.value;
      this.changeFilter.next(this.getSelection());
    }
  }

  select(event: MatSelectChange): void {
    this.changeFilter.next({
      group: this.group,
      value: event.value,
    });
  }

  getSelection(): ActiveFilter {
    return {
      group: this.group,
      value: this.mySelect.value,
    };
  }
}
