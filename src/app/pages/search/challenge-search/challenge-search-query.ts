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
  sort?:
    | 'featured'
    | 'startDate'
    | 'participantCount'
    | 'viewCount'
    | 'starredCount'
    | 'name'
    | 'createdAt'
    | 'updatedAt';
  direction?: 'asc' | 'desc';
  searchTerms?: string;
  topics?: string[];
  status?: ChallengeStatus[];
  platformIds?: string[];
  startDateRange?: DateRange;
  startYearRange?: DateRange;
  inputDataTypes?: string[];
  difficulty?: ChallengeDifficulty[];
  submissionTypes?: ChallengeSubmissionType[];
  incentiveTypes?: ChallengeIncentiveType[];
  orgIds?: string[];
  organizerIds?: string[];
  sponsorIds?: string[];
}
