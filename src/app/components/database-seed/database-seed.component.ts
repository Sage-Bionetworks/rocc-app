import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mapTo, mergeMap, switchMap, tap } from 'rxjs/operators';
import { merge as _merge } from 'lodash';
import {
  ChallengeService,
  ChallengePlatformService,
  GrantService,
  OrganizationService,
  PersonService,
  TagService
} from '@sage-bionetworks/rocc-client-angular';
import {
  Challenge,
  ChallengeCreateRequest,
  ChallengePlatform,
  ChallengePlatformCreateRequest,
  Grant,
  GrantCreateRequest,
  GrantCreateResponse,
  Organization,
  OrganizationCreateRequest,
  Person,
  PersonCreateRequest,
  PersonCreateResponse,
  Tag,
  TagCreateRequest
} from '@sage-bionetworks/rocc-client-angular';
import { forkJoinConcurrent } from '../../forkJoinConcurrent';
import { omit } from '../../omit';
import { DocumentsCreateResult } from './documents-create-result';

import challengeList from '../../seeds/dream/challenges.json';
import challengePlatformList from '../../seeds/dream/challenge-platforms.json';
import grantList from '../../seeds/dream/grants.json';
import organizationList from '../../seeds/dream/organizations.json';
import personList from '../../seeds/dream/persons.json';
import tagList from '../../seeds/dream/tags.json';

@Component({
  selector: 'rocc-database-seed',
  templateUrl: './database-seed.component.html',
  styleUrls: ['./database-seed.component.scss']
})

export class DatabaseSeedComponent implements OnInit {

  constructor(
    private challengeService: ChallengeService,
    private challengePlatformService: ChallengePlatformService,
    private grantService: GrantService,
    private organizationService: OrganizationService,
    private personService: PersonService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {

    // Maximum number of concurrent requests sent to the ROCC API service
    // TODO: Add to configuration file
    const concurrency = 1;

    const removeDocuments$ = forkJoin([
      this.challengeService.deleteAllChallenges(),
      this.challengePlatformService.deleteAllChallengePlatforms(),
      this.grantService.deleteAllGrants(),
      this.organizationService.deleteAllOrganizations(),
      this.personService.deleteAllPersons(),
      this.tagService.deleteAllTags(),
    ]);

    // Creates Tags.
    const createTags$: Observable<Tag[]> = of(tagList.tags as Tag[])
      .pipe(
        tap(() => console.log('Creating tags')),
        mergeMap(tags => forkJoinConcurrent(
          tags.map(tag => this.tagService.createTag(tag.id, omit(tag, ['id']) as TagCreateRequest)),
          concurrency
        )),
        mapTo(tagList.tags as Tag[]),
        tap(tags => console.log('Tags created', tags))
      );

    // Creates Organizations.
    const createOrganizations$: Observable<Organization[]> = of(organizationList.organizations as Organization[])
      .pipe(
        tap(() => console.log('Creating organizations')),
        mergeMap(organizations => forkJoinConcurrent(
          organizations.map(org => this.organizationService.createOrganization(
            org.id, omit(org, ['id']) as OrganizationCreateRequest
          )),
          concurrency
        )),
        mapTo(organizationList.organizations as Organization[]),
        tap(organizations => console.log('Organizations created', organizations))
      );

    // Creates Challenge Platforms.
    const createChallengePlatforms$: Observable<ChallengePlatform[]> = of(
      challengePlatformList.challengePlatforms as ChallengePlatform[]
    ).pipe(
      tap(() => console.log('Creating challenge platforms')),
      mergeMap((platforms) =>
        forkJoinConcurrent(
          platforms.map((platform) =>
            this.challengePlatformService.createChallengePlatform(
              platform.id,
              omit(platform, ['id']) as ChallengePlatformCreateRequest
            )
          ),
          concurrency
        )
      ),
      mapTo(challengePlatformList.challengePlatforms as ChallengePlatform[]),
      tap((platforms) => console.log('Challenge platforms created', platforms))
    );

    // Creates Grants.
    const createGrants$: Observable<DocumentsCreateResult<Grant>> = of(grantList.grants as Grant[])
      .pipe(
        tap(grants => console.log('Creating grants')),
        mergeMap(grants => forkJoinConcurrent(
          grants.map(grant => this.grantService.createGrant(
            omit(grant, ['id']) as GrantCreateRequest
          )),
          concurrency
        )),
        map((grantCreateResponses: GrantCreateResponse[]) => {
          return {
            documents: _merge([], grantList.grants, grantCreateResponses),
            idMaps: _merge([], grantCreateResponses, grantList.grants.map(
              grant => ({ tmpId: grant.id })))
          } as DocumentsCreateResult<Grant>;
        }),
        tap(res => console.log('Grants created', res))
      );

    // Creates Persons.
    const createPersons$: Observable<DocumentsCreateResult<Person>> = of(personList.persons as Person[])
      .pipe(
        tap(persons => console.log('Creating persons')),
        mergeMap(persons => forkJoinConcurrent(
          persons.map(person => this.personService.createPerson(
            omit(person, ['id']) as PersonCreateRequest
          )),
          concurrency
        )),
        map((personCreateResponses: PersonCreateResponse[]) => {
          return {
            documents: _merge([], personList.persons, personCreateResponses),
            idMaps: _merge([], personCreateResponses, personList.persons.map(
              person => ({ tmpId: person.id })))
          } as DocumentsCreateResult<Person>;
        }),
        tap(res => console.log('Persons created', res))
      );

    // Returns the Grant ids for a challenge.
    const getGrantIds = (
      challengeCreateRequest: ChallengeCreateRequest,
      grantsCreateResult: DocumentsCreateResult<Grant>
    ): Observable<string[]> => {
      return of(challengeCreateRequest)
        .pipe(
          map(rawChallenge => rawChallenge.grantIds
            .map(grantId => {
              const grant = grantsCreateResult.idMaps.find(idMap => idMap.tmpId === grantId);
              if (grant === undefined) {
                throw new Error('Grant with id ' + grantId + ' not found');
              }
              return grant.id;
            })
          )
        );
    };

    // Returns the Person ids for the organizers of a challenge.
    const getOrganizerIds = (
      challengeCreateRequest: ChallengeCreateRequest,
      personsCreateResult: DocumentsCreateResult<Person>
    ): Observable<string[]> => {
      return of(challengeCreateRequest)
        .pipe(
          map(rawChallenge => rawChallenge.organizerIds
            .map(organizerId => {
              const person = personsCreateResult.idMaps.find(idMap => idMap.tmpId === organizerId);
              if (person === undefined) {
                throw new Error('Organizer with id ' + organizerId + ' not found');
              }
              return person.id;
            })
          )
        );
    };

    // Creates a Challenge.
    const createChallenge = (rawChallenge: ChallengeCreateRequest): Observable<Challenge> => {
      return this.challengeService.createChallenge(rawChallenge).pipe(
        map(res => _merge(res, rawChallenge) as Challenge),
      );
    };

    // Creates Challenges.
    const createChallenges = (
      challengeCreateRequests: ChallengeCreateRequest[],
      grantsCreateResult: DocumentsCreateResult<Grant>,
      personsCreateResult: DocumentsCreateResult<Person>
    ): Observable<Challenge[]> => {
      return of(challengeCreateRequests)
        .pipe(
          tap(() => console.log('Creating challenges')),
          mergeMap(rawChallenges => forkJoinConcurrent(
            rawChallenges.map((rawChallenge: ChallengeCreateRequest) => of(rawChallenge)
              .pipe(
                mergeMap(() => forkJoin({
                  grantIds: getGrantIds(rawChallenge, grantsCreateResult),
                  organizerIds: getOrganizerIds(rawChallenge, personsCreateResult)
                })),
                mergeMap(res => {
                  _merge(rawChallenge, res);
                  return createChallenge(rawChallenge);
                })
              )), 1
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
          createChallengePlatforms$,
          createGrants$,
          createPersons$
        ], 1)),
        switchMap(res => {
          return createChallenges(
            challengeList.challenges as ChallengeCreateRequest[],
            res[3] as DocumentsCreateResult<Grant>,
            res[4] as DocumentsCreateResult<Person>
          );
        }),
      ).subscribe(() => {
        console.log('DB seeding completed');
      }, err => console.log(err));
  }
}