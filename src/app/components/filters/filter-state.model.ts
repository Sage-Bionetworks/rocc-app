import { DateRange } from './date-range-filter/date-range';

export interface FilterState {
  /* The name of the filter. */
  name: string;
  /* */
  value: number | string | DateRange | (number | string | DateRange)[];
}
