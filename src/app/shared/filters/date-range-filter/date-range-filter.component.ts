import {
  Component,
  Input,
  Output,
  forwardRef,
  OnInit,
  EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
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
// TODO: Setting a different [values] programmatically should update the UI
export class DateRangeFilterComponent
  extends FilterComponent
  implements OnInit
{
  @Input() range!: FormGroup;

  @Output() timeOfChanged = new EventEmitter<number>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    // TODO: Add validation
    const startDateRange = this.values[0].value as DateRange;
    this.range.get('start')?.setValue(startDateRange.start);
    this.range.get('end')?.setValue(startDateRange.end);

    combineLatest([
      this.range.controls.start.valueChanges,
      this.range.controls.end.valueChanges,
    ])
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map(
          ([start, end]) =>
            ({
              start,
              end,
            } as DateRange)
        )
      )
      .subscribe(
        (range) => {
          this.values[0].value = range;
          this.emitState();
        },
        (err) => console.log(err)
      );
  }

  getState(): FilterState {
    const activeValue = this.values.find((value) => value.active);
    return {
      name: this.name,
      value: activeValue !== undefined ? activeValue.value : '',
    };
  }

  getTimeChanged(): void {
    this.timeOfChanged.emit(new Date().getTime());
  }
}
