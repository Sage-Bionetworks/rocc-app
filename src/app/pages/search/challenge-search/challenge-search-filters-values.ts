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
      end: '2030-07-21',
    },
    title: '',
    active: true,
  },
];

export const challengeDifficultyFilterValues: FilterValue[] = [
  {
    value: 'GoodForBeginners',
    title: 'Good For Beginners',
    active: false,
  },
  {
    value: 'Intermediate',
    title: 'Intermediate',
    active: false,
  },
  {
    value: 'Advanced',
    title: 'Advanced',
    active: false,
  },
];

export const challengeSubmissionTypesFilterValues: FilterValue[] = [
  {
    value: 'DockerImage',
    title: 'Docker Image',
    active: false,
  },
  {
    value: 'PredictionFile',
    title: 'Prediction File',
    active: false,
  },
  {
    value: 'Other',
    title: 'Other',
    active: false,
  },
];

// export const challengeInputDataTypesFilterValues: FilterValue[] = [

// ];

export const challengeIncentiveTypesFilterValues: FilterValue[] = [
  {
    value: 'Monetary',
    title: 'Monetary',
    active: false,
  },
  {
    value: 'Publication',
    title: 'Publication',
    active: false,
  },
  {
    value: 'SpeakingEngagement',
    title: 'Speaking Engagement',
    active: false,
  },
  {
    value: 'Other',
    title: 'Other',
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
