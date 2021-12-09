import { DateRange } from '@angular/material/datepicker';
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

const thisYear = new Date().getFullYear();

const updateYear = (
  thisYear: number,
  startYearDiff: number,
  endYearDiff: number
) => {
  return {
    start: new Date(thisYear + startYearDiff, 0, 1),
    end: new Date(thisYear + endYearDiff, 11, 31),
  };
};

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
      end: '2030-07-21',
    },
    title: '',
    active: true,
  },
];

export const challengeStartYearRangeFilterValues: FilterValue[] = [
  {
    value: challengeStartDateRangeFilterValues[0].value,
    title: 'All',
    active: true,
  },
  {
    value: updateYear(thisYear, 1, 1),
    title: (thisYear + 1).toString(),
    active: false,
  },
  {
    value: updateYear(thisYear, 0, 0),
    title: thisYear.toString(),
    active: false,
  },
  {
    value: updateYear(thisYear, -1, -1),
    title: (thisYear - 1).toString(),
    active: false,
  },
  {
    value: updateYear(thisYear, -2, -2),
    title: (thisYear - 2).toString(),
    active: false,
  },
  {
    value: updateYear(thisYear, -6, -3),
    title: thisYear - 6 + ' - ' + (thisYear - 3),
    active: false,
  },
  {
    value: updateYear(thisYear, -11, -7),
    title: thisYear - 11 + ' - ' + (thisYear - 7),
    active: false,
  },
  {
    value: updateYear(thisYear, -17, -12),
    title: thisYear - 17 + ' - ' + (thisYear - 12),
    active: false,
  },
  {
    value: updateYear(thisYear, -28, -18),
    title: thisYear - 28 + ' - ' + (thisYear - 18),
    active: false,
  },
  {
    value: 'custom',
    title: 'Custom',
    active: false,
  },
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
    active: true,
  },
];
