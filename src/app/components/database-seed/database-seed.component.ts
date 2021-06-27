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
import orgList from '../../seeds/dream/organizations.json';
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
    const removeDocuments$ = forkJoin([
      this.challengeService.deleteAllChallenges(),
      this.grantService.deleteAllGrants(),
      this.organizationService.deleteAllOrganizations(),
      this.personService.deleteAllPersons(),
      this.tagService.deleteAllTags(),
    ]);

    const concurrency = 5;

    // interface RawChallenge {
    //   name: string,
    //   description: string,
    //   summary?: string,
    //   startDate?: string,
    //   endDate?: string,
    //   url: string,
    //   status: ChallengeStatus,
    //   tagIds: Array<string>,
    //   organizerIds: Array<string>,
    //   dataProviderIds: Array<string>,
    //   grantIds: Array<string>
    // }

    // Objects with pre-defined IDs
    const tags: Tag[] = tagList.tags;
    const organizations: Organization[] = orgList.organizations;
    // Objects with IDs defined by the API service
    const rawChallenges = challengeList.challenges;
    const rawGrants = grantList.grants;
    let grants: Grant[] = [];

    const createTags$: Observable<Tag[]> = of(tags)
      .pipe(
        tap(() => console.log('Creating tags')),
        mergeMap(tags => forkJoinConcurrent(
          tags.map(tag => this.tagService.createTag(tag.id, {
            description: tag.description
          })),
          concurrency
        )),
        mapTo(tags),
        tap(() => console.log('Tags created', tags))
      );

    const createOrganizations$: Observable<Organization[]> = of(organizations)
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
        mapTo(organizations),
        tap(() => console.log('Organizations created', organizations))
      );

    const createGrants$: Observable<Grant[]> = of(rawGrants)
      .pipe(
        tap(() => console.log('Creating grants')),
        mergeMap(rawGrants => forkJoinConcurrent(
          rawGrants.map(rawGrant => this.grantService.createGrant({
              name: rawGrant.name,
              description: rawGrant.description
            }
          )),
          concurrency
        )),
        map(grantIds => <Grant[]>(_merge(grantIds, rawGrants))),
        tap(grants_ => grants = grants_),
        tap(res => console.log('Grants created', res))
      );

    // Creates the challenge organizers and returns their Person Ids.
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

    // Creates a challenge.
    const createChallenge = (rawChallenge: ChallengeCreateRequest, organizerIds: string[]): Observable<Challenge> => {
      return this.challengeService.createChallenge({
        name: rawChallenge.name,
        description: rawChallenge.description,
        url: rawChallenge.url,
        status: rawChallenge.status,
        tagIds: rawChallenge.tagIds,
        organizerIds: organizerIds,
        dataProviderIds: rawChallenge.dataProviderIds,
        grantIds: []
      }).pipe(
        map(res => <Challenge>(_merge(res, rawChallenge))),
      );
    };

    // const createChallengeOrganizers$ = pipe(
    //   mergeMap((rowChallenge: any) => forkJoinConcurrent(
    //     rowChallenge.organizerIds.map((rawOrganizer: PersonCreateRequest) => this.personService.createPerson({
    //         firstName: rawOrganizer.firstName,
    //         lastName: rawOrganizer.lastName,
    //         organizationIds: rawOrganizer.organizationIds
    //     })),
    //     1
    //   )),
    //   map(organizerCreateResponses => _map(organizerCreateResponses, 'id'))
    // )

    // const createChallenges = pipe(
    //     tap(() => console.log('Creating challenges')),
    //     mergeMap(rawChallenges => forkJoin(
    //       rawChallenges.map((rawchallenge: any) => of(rawchallenge).pipe(
    //         tap(() => console.log("Creating organizers for challenge " + rawchallenge.name)),
    //         mergeMap(() => forkJoin({
    //           organizerIds: createChallengeOrganizers(rawchallenge)
    //         })),
    //         mergeMap(res => createChallenge(rawchallenge, res.organizerIds))
    //       )),
    //     )),
    //     tap(challenges => console.log('Challenge created', challenges))
    //   );

    // Creates all the challenges.
    const createChallenges = (rawChallenges: any[], grants: Grant[]): any => {
      return of(rawChallenges).pipe(
        tap(() => console.log('Creating challenges')),
        mergeMap(rawChallenges => forkJoin(
          rawChallenges.map((rawchallenge: any) => of(rawchallenge)
            .pipe(
              tap(() => console.log("Creating organizers for challenge " + rawchallenge.name)),
              mergeMap(() => forkJoin({
                organizerIds: createChallengeOrganizers(rawchallenge)
              })),
              mergeMap(res => createChallenge(rawchallenge, res.organizerIds))
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
        switchMap(res => createChallenges(rawChallenges, res[2])),
      ).subscribe(() => {
        console.log('DB seeding completed');
      }, err => console.log(err));
  }
}
