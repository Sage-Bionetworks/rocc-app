import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, defer, forkJoin, of, pipe, Observable } from 'rxjs';
import { last, map, mapTo, mergeAll, mergeMap, switchMap, tap } from 'rxjs/operators';
import { map as _map, merge as _merge } from 'lodash';
import {
  ChallengeService,
  GrantService,
  OrganizationService,
  PersonService,
  TagService
} from '@sage-bionetworks/rocc-client-angular';
import {
  Challenge,
  ChallengeCreateRequest,
  ChallengeCreateResponse,
  ChallengeStatus,
  Grant,
  Organization,
  PersonCreateRequest,
  Tag,
  TagCreateResponse
} from '@sage-bionetworks/rocc-client-angular';
import tagList from '../../seeds/dream/tags.json';
import organizationList from '../../seeds/dream/organizations.json';
import challengeList from '../../seeds/dream/challenges.json';
import grantList from '../../seeds/dream/grants.json';

import { getCurrencySymbol } from '@angular/common';
import { forkJoinConcurrent } from '../../forkJoinConcurrent';

@Component({
  selector: 'rocc-database-seed',
  templateUrl: './database-seed.component.html',
  styleUrls: ['./database-seed.component.scss']
})

export class DatabaseSeedComponent implements OnInit {

  constructor(
    private challengeService: ChallengeService,
    private grantService: GrantService,
    private organizationService: OrganizationService,
    private personService: PersonService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {

    // Maximum number of concurrent requests sent to the ROCC API service
    // TODO: Add to configuration file
    const concurrency = 5;

    const removeDocuments$ = forkJoin([
      this.challengeService.deleteAllChallenges(),
      this.grantService.deleteAllGrants(),
      this.organizationService.deleteAllOrganizations(),
      this.personService.deleteAllPersons(),
      this.tagService.deleteAllTags(),
    ]);

    // Creates Tags (id pre-defined)
    const createTags$: Observable<Tag[]> = of(tagList.tags as Tag[])
      .pipe(
        tap(() => console.log('Creating tags')),
        mergeMap(tags => forkJoinConcurrent(
          tags.map(tag => this.tagService.createTag(tag.id, {
            description: tag.description
          })),
          concurrency
        )),
        mapTo(tagList.tags as Tag[]),
        tap(tags => console.log('Tags created', tags))
      );

    // Creates Organizations (id pre-defined)
    const createOrganizations$: Observable<Organization[]> = of(organizationList.organizations as Organization[])
      .pipe(
        tap(() => console.log('Creating organizations')),
        mergeMap(organizations => forkJoinConcurrent(
          organizations.map(org => this.organizationService.createOrganization(
            org.id, {
              name: org.name,
              url: org.url,
              shortName: org.shortName
            }
          )),
          concurrency
        )),
        mapTo(organizationList.organizations as Organization[]),
        tap(organizations => console.log('Organizations created', organizations))
      );

    // Creates Grants (id defined by the API service)
    const createGrants$: Observable<Grant[]> = of(grantList.grants)
      .pipe(
        tap(rawGrants => console.log('Creating grants')),
        mergeMap(rawGrants => forkJoinConcurrent(
          rawGrants.map(rawGrant => this.grantService.createGrant({
            name: rawGrant.name,
            description: rawGrant.description
          })),
          concurrency
        )),
        map(grantIds => _merge(grantIds, grantList.grants) as Grant[]),
        tap(res => console.log('Grants created', res))
      );

    // Creates the challenge organizers and returns their Person ids.
    const createChallengeOrganizers = (rawChallenge: any): Observable<string[]> => {
      return forkJoinConcurrent(
          rawChallenge.organizerIds.map((rawOrganizer: PersonCreateRequest) => this.personService.createPerson({
              firstName: rawOrganizer.firstName,
              lastName: rawOrganizer.lastName,
              organizationIds: rawOrganizer.organizationIds
            }
          )),
          1
        ).pipe(
          map(organizerCreateResponses => _map(organizerCreateResponses, 'id'))
        );
    };

    // Returns the Grant ids for a challenge from Challenge.tmpGrantIds.
    // TODO Consider using custom model for grants that include tmpId or give
    // grant Ids lookup table as input
    const getGrantIds = (challengeCreateRequest: ChallengeCreateRequest, grants: any[]): Observable<string[]> => {
      return of(challengeCreateRequest)
        .pipe(
          map(rawChallenge => rawChallenge.grantIds
            .map(grantId => grants.find(grant => grant.tmpId === grantId).id
          ))
        );
    };

    // Creates a Challenge.
    const createChallenge = (rawChallenge: ChallengeCreateRequest): Observable<Challenge> => {
      return this.challengeService.createChallenge({
        name: rawChallenge.name,
        description: rawChallenge.description,
        url: rawChallenge.url,
        status: rawChallenge.status,
        tagIds: rawChallenge.tagIds,
        organizerIds: rawChallenge.organizerIds,
        dataProviderIds: rawChallenge.dataProviderIds,
        grantIds: rawChallenge.grantIds
      }).pipe(
        map(res => _merge(res, rawChallenge) as Challenge),
      );
    };

    // Creates Challenges.
    // TODO: Replace type any
    const createChallenges = (challengeCreateRequests: any[], grants: Grant[]): any => {
      return of(challengeCreateRequests)
        .pipe(
          tap(() => console.log('Creating challenges')),
          mergeMap(rawChallenges => forkJoin(
            rawChallenges.map((rawchallenge: ChallengeCreateRequest) => of(rawchallenge)
              .pipe(
                mergeMap(() => forkJoin({
                  organizerIds: createChallengeOrganizers(rawchallenge),
                  grantIds: getGrantIds(rawchallenge, grants)
                })),
                mergeMap(res => {
                  rawchallenge = _merge(rawchallenge, res);
                  return createChallenge(rawchallenge);
                })
              )),
          )),
          tap(challenges => console.log('Challenge created', challenges))
        );
    };

    console.log('Removing DB documents');
    removeDocuments$
      .pipe(
        mergeMap(() => forkJoinConcurrent([
          createTags$,
          createOrganizations$,
          createGrants$
        ], 1)),
        switchMap(res => createChallenges(challengeList.challenges, res[2])),
      ).subscribe(() => {
        console.log('DB seeding completed');
      }, err => console.log(err));
  }
}
