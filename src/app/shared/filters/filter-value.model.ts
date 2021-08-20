import { DateRange } from './date-range-filter/date-range';

export interface FilterValue {
  /* The value of the filter. */
  value: number | string | DateRange;
  /* The display name of the filter value. */
  title: string;
  /* Whether this filter value is active. */
  active: boolean;
}
