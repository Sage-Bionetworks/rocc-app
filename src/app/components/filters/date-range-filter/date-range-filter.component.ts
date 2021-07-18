import { Component, forwardRef, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FilterState } from '../filter-state.model';
import { FilterComponent } from '../filter.component';
import { DateRange } from './date-range';

@Component({
  selector: 'sage-date-range-filter',
  templateUrl: './date-range-filter.html',
  styleUrls: ['./date-range-filter.scss'],
  providers: [
    {
      provide: FilterComponent,
      useExisting: forwardRef(() => DateRangeFilterComponent),
    },
  ],
})
export class DateRangeFilterComponent
  extends FilterComponent
  implements OnInit
{
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor() {
    super();
  }

  ngOnInit(): void {
    console.log('RANGE INIT', this.values);
    const startDateRange = this.values[0].value as DateRange;
    this.range.get('start')?.setValue(startDateRange.start);
    this.range.get('end')?.setValue(startDateRange.end);


    combineLatest([
      this.range.controls.start.valueChanges,
      this.range.controls.end.valueChanges,
    ])
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(
        (_term) => this.state.next(this.getState()),
        (err) => console.log(err)
      );
    // .subscribe((res) => console.log('DATE RANGE', res));
  }

  getState(): FilterState {
    // this.values = [];
    console.log('RANGE', this.range);

    return {
      name: this.name,
      value: {
        start: this.range.get('start')?.value,
        end: this.range.get('end')?.value
      },
      // value: this.values
      //   .filter((value) => value.active)
      //   .map((value) => value.value),
    };
  }
}
