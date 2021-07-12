import { ButtonToggleFilterValue } from 'src/app/components/filters/button-toggle-filter/button-toggle-filter-value';
import { FilterValue } from 'src/app/components/filters/filter-value.model';

export const orderByFilterValues: FilterValue[] = [
  {
    value: '-createdAt',
    title: `Newest challenges`,
    active: true,
  },
  {
    value: 'createdAt',
    title: `Oldest challenges`,
    active: false,
  },
];

export const challengeTypeFilterValues: FilterValue[] = [
  {
    value: 'challenge',
    title: 'Challenge',
    active: true,
  },
  {
    value: 'benchmark',
    title: 'Benchmark',
    active: false,
  },
];

export const previewTypeFilterValues: ButtonToggleFilterValue[] = [
  {
    value: 'array',
    title: 'Array',
    icon: 'view_array',
    active: true,
  },
  {
    value: 'list',
    title: 'List',
    icon: 'view_list',
    active: false,
  },
];
