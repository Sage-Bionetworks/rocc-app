export interface Filter {
  /* The value of the filter. */
  value: number | string;
  /* The display name of the filter value. */
  title: string;
  /* Whether this filter value is active. */
  active?: boolean;
}
