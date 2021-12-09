import {
  ChallengeStatus,
  DateRange,
  ChallengeDifficulty,
  ChallengeSubmissionType,
  ChallengeIncentiveType,
} from '@sage-bionetworks/rocc-client-angular';
// import { DateRange } from 'src/app/components/filters/date-range-filter/date-range';

export interface ChallengeSearchQuery {
  limit?: number;
  offset?: number;
  sort?: 'createdAt' | 'updatedAt';
  direction?: 'asc' | 'desc';
  searchTerms?: string;
  topics?: string[];
  status?: ChallengeStatus[];
  platformIds?: string[];
  startYearRange?: DateRange | string;
  startDateRange?: DateRange;
  inputDataTypes?: string[];
  difficulty?: ChallengeDifficulty[];
  submissionTypes?: ChallengeSubmissionType[];
  incentiveTypes?: ChallengeIncentiveType[];
  orgIds?: string[];
  organizerIds?: string[];
  sponsorIds?: string[];
}
