import { FilterValue } from '@shared/filters/filter-value.model';

export interface ChallengeSearchQuery {
  limit?: number;
  offset?: number;
  searchTerms?: string;
}

export const defaultChallengeSearchQuery: ChallengeSearchQuery = {
  limit: 10,
  offset: 0,
  searchTerms: '',
};

export const searchTermsFilterValues: FilterValue[] = [
  {
    value: '',
    title: '',
    active: true,
  },
];
