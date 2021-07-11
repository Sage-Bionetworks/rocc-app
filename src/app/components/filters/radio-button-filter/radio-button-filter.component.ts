import { Component, ViewChild, forwardRef } from "@angular/core";
import { MatRadioChange, MatRadioGroup } from '@angular/material/radio';
import { ActiveFilter } from "../active-filter.model";
import { FiltersComponent } from "../filters.component";

@Component({
  selector: "radio-button-filter",
  templateUrl: "./radio-button-filter.html",
  styleUrls: ["./radio-button-filter.scss"],
  providers: [
    {
      provide: FiltersComponent,
      useExisting: forwardRef(() => RadioButtonFilterComponent),
    },
  ],
})
export class RadioButtonFilterComponent extends FiltersComponent {
  @ViewChild(MatRadioGroup, { static: true }) radioGroup!: MatRadioGroup;

  constructor() {
    super();
  }

  ngOnInit() {
    let activeFilter = this.filters.find(filter => filter.active);
    if (activeFilter !== undefined) {
      this.radioGroup.value = activeFilter.value;
      this.changeFilter.next(this.getSelection());
    }
  }

  select(event: MatRadioChange): void {
    this.changeFilter.next({
      group: this.group,
      value: event.value,
    });
  }

  getSelection(): ActiveFilter {
    return {
      group: this.group,
      value: this.radioGroup.value
    };
  }
}
