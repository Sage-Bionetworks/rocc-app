import { ButtonToggleFilterValue } from '@shared/filters/button-toggle-filter/button-toggle-filter-value';
import { FilterValue } from '@shared/filters/filter-value.model';

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

export const challengeStatusFilterValues: FilterValue[] = [
  {
    value: 'active',
    title: `Active`,
    active: false,
  },
  {
    value: 'upcoming',
    title: `Upcoming`,
    active: false,
  },
  {
    value: 'completed',
    title: `Completed`,
    active: false,
  },
];

export const challengeStartDateRangeFilterValues: FilterValue[] = [
  {
    value: {
      start: '2010-07-21',
      end: '2030-07-21'
    },
    title: '',
    active: true
  }
];

// export const tagFilterValues: FilterValue[] = [
//   {
//     value: 'a',
//     title: 'A',
//     active: false
//   },
//   {
//     value: 'b',
//     title: 'B',
//     active: false
//   }
// ];

export const searchTermsFilterValues: FilterValue[] = [
  {
    value: '',
    title: '',
    active: true
  },
];
