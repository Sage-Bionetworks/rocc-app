import { ChallengeStatus, DateRange } from '@sage-bionetworks/rocc-client-angular';
// import { DateRange } from 'src/app/components/filters/date-range-filter/date-range';

export interface ChallengeListQuery {
  limit?: number;
  offset?: number;
  sort?: 'createdAt' | 'updatedAt';
  direction?: 'asc' | 'desc';
  searchTerms?: string;
  tagIds?: string[];
  status?: ChallengeStatus[];
  platformIds?: string[];
  startDateRange?: DateRange;
}
