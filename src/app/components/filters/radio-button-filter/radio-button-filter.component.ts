import { OnInit } from '@angular/core';
import { Component, ViewChild, forwardRef } from '@angular/core';
import { MatRadioChange, MatRadioGroup } from '@angular/material/radio';
import { FilterState } from '../filter-state.model';
import { FilterComponent } from '../filter.component';

@Component({
  selector: 'sage-radio-button-filter',
  templateUrl: './radio-button-filter.html',
  styleUrls: ['./radio-button-filter.scss'],
  providers: [
    {
      provide: FilterComponent,
      useExisting: forwardRef(() => RadioButtonFilterComponent),
    },
  ],
})
export class RadioButtonFilterComponent
  extends FilterComponent
  implements OnInit
{
  @ViewChild(MatRadioGroup, { static: true }) radioGroup!: MatRadioGroup;

  constructor() {
    super();
  }

  ngOnInit(): void {
    const activeValue = this.values.find((value) => value.active);
    if (activeValue !== undefined) {
      this.radioGroup.value = activeValue.value;
      this.state.next(this.getState());
    }
  }

  getState(): FilterState {
    return {
      name: this.name,
      value: this.radioGroup.value,
    };
  }

  emitState(event: MatRadioChange): void {
    this.state.next({
      name: this.name,
      value: event.value,
    });
  }


}
