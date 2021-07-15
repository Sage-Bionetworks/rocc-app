export * from './challenge.service';
import { ChallengeService } from './challenge.service';
export * from './grant.service';
import { GrantService } from './grant.service';
export * from './healthCheck.service';
import { HealthCheckService } from './healthCheck.service';
export * from './organization.service';
import { OrganizationService } from './organization.service';
export * from './person.service';
import { PersonService } from './person.service';
export * from './tag.service';
import { TagService } from './tag.service';
export * from './user.service';
import { UserService } from './user.service';
export const APIS = [ChallengeService, GrantService, HealthCheckService, OrganizationService, PersonService, TagService, UserService];
