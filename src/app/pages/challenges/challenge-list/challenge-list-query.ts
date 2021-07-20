import { DateRange } from 'src/app/components/filters/date-range-filter/date-range';

export interface ChallengeListQuery {
  limit: number;
  offset: number;
  sort: string;
  direction: string;
  searchTerms: string;
  tagIds: string[];
  status: string[];
  platformIds: string[];
  startDateRange: DateRange[];
}
