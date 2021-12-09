import { DateRange } from './date-range-filter/date-range';

export interface FilterValue {
  /* The value of the filter. */
  value: number | string | DateRange | undefined;
  /* The display name of the filter value. */
  title: string;
  /* Whether this filter value is active. */
  active: boolean;
  /* The login of org or user account. */
  login?: string;
  /* The avatarUrl of org or user account. */
  avatarUrl?: string;
}
