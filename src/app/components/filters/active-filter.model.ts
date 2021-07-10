export interface ActiveFilter {
  /* The name of the filter. */
  group: string;
  /* */
  value: number | string | (number | string)[];
}
