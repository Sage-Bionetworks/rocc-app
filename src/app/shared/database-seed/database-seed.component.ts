import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import {
  map,
  mapTo,
  mergeMap,
  share,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { merge as _merge } from 'lodash-es';
import {
  AccountService,
  ChallengeService,
  ChallengePlatformService,
  GrantService,
  OrganizationService,
  PersonService,
  TagService,
  UserService,
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
  TagCreateRequest,
  User,
  UserCreateRequest,
  UserCreateResponse,
  OrganizationCreateResponse,
  ChallengePlatformCreateResponse,
  OrgMembershipService,
  OrgMembershipCreateRequest,
  OrgMembership,
  ChallengeReadme,
  ChallengeReadmeCreateRequest,
  ChallengeReadmeUpdateRequest,
} from '@sage-bionetworks/rocc-client-angular';
import { forkJoinConcurrent } from '../../forkJoinConcurrent';
import { omit } from '../../omit';
import { DocumentsCreateResult } from './documents-create-result';

import challengeList from '@app/seeds/production/challenges.json';
import challengePlatformList from '@app/seeds/production/challenge-platforms.json';
import challengeReadmeList from '@app/seeds/production/challenge-readmes.json';
import organizationList from '@app/seeds/production/organizations.json';
import orgMembershipList from '@app/seeds/production/org-memberships.json';
import userList from '@app/seeds/production/users.json';

@Component({
  selector: 'rocc-database-seed',
  templateUrl: './database-seed.component.html',
  styleUrls: ['./database-seed.component.scss'],
})
export class DatabaseSeedComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private challengePlatformService: ChallengePlatformService,
    private challengeService: ChallengeService,
    private organizationService: OrganizationService,
    private orgMembershipService: OrgMembershipService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Maximum number of concurrent requests sent to the ROCC API service
    // TODO: Add to configuration file
    const concurrency = 10;

    const removeDocuments$ = forkJoin([
      this.challengeService.deleteAllChallenges(),
      this.challengePlatformService.deleteAllChallengePlatforms(),
      this.organizationService.deleteAllOrganizations(),
      this.orgMembershipService.deleteAllOrgMemberships(),
      this.userService.deleteAllUsers(),
    ]);

    // Creates Users
    const createUsers$: Observable<DocumentsCreateResult<User>> = of(
      userList.users as User[]
    ).pipe(
      tap(() => console.log('Creating users')),
      mergeMap((users) =>
        forkJoinConcurrent(
          users.map((user) => {
            let userRequest = omit(user, ['id']) as UserCreateRequest;
            userRequest.password = 'yourpassword';
            return this.userService.createUser(userRequest);
          }),
          concurrency
        )
      ),
      map((userCreateResponses: UserCreateResponse[]) => {
        return {
          documents: _merge([], userList.users, userCreateResponses),
          idMaps: _merge(
            [],
            userCreateResponses,
            userList.users.map((user) => ({ tmpId: user.id }))
          ),
        } as DocumentsCreateResult<User>;
      }),
      tap((res) => console.log('Users created', res))
    );

    // Creates Organizations
    const createOrganizations$: Observable<
      DocumentsCreateResult<Organization>
    > = of(organizationList.organizations as Organization[]).pipe(
      tap(() => console.log('Creating organizations')),
      mergeMap((orgs) =>
        forkJoinConcurrent(
          orgs.map((org) =>
            this.organizationService.createOrganization(
              omit(org, ['id']) as OrganizationCreateRequest
            )
          ),
          concurrency
        )
      ),
      map((orgCreateResponses: OrganizationCreateResponse[]) => {
        return {
          documents: _merge(
            [],
            organizationList.organizations,
            orgCreateResponses
          ),
          idMaps: _merge(
            [],
            orgCreateResponses,
            organizationList.organizations.map((org) => ({ tmpId: org.id }))
          ),
        } as DocumentsCreateResult<Organization>;
      }),
      tap((res) => console.log('Organizations created', res))
    );

    // Creates ChallengePlatforms
    const createChallengePlatforms$: Observable<
      DocumentsCreateResult<ChallengePlatform>
    > = of(
      challengePlatformList.challengePlatforms as ChallengePlatform[]
    ).pipe(
      tap(() => console.log('Creating challenge platforms')),
      mergeMap((challengePlatforms) =>
        forkJoinConcurrent(
          challengePlatforms.map((challengePlatform) =>
            this.challengePlatformService.createChallengePlatform(
              omit(challengePlatform, ['id']) as ChallengePlatformCreateRequest
            )
          ),
          concurrency
        )
      ),
      map(
        (
          challengePlatformCreateResponses: ChallengePlatformCreateResponse[]
        ) => {
          return {
            documents: _merge(
              [],
              challengePlatformList.challengePlatforms,
              challengePlatformCreateResponses
            ),
            idMaps: _merge(
              [],
              challengePlatformCreateResponses,
              challengePlatformList.challengePlatforms.map(
                (challengePlatform) => ({ tmpId: challengePlatform.id })
              )
            ),
          } as DocumentsCreateResult<ChallengePlatform>;
        }
      ),
      tap((res) => console.log('Challenge platforms created', res))
    );

    // Returns the identifier of an object in the DB given its tmpId.
    const getObjectIdFromTmpId = (
      tmpObjectId: string | undefined,
      objectsCreateResult: DocumentsCreateResult<any>
    ): Observable<string> => {
      return of(tmpObjectId).pipe(
        map((tmpObjectId) => {
          const object = objectsCreateResult.idMaps.find(
            (idMap) => idMap.tmpId === tmpObjectId
          );
          if (object === undefined) {
            throw new Error('Object with tmpId ' + tmpObjectId + ' not found');
          }
          return object.id;
        })
      );
    };

    // // Creates Tags.
    // const createTags$: Observable<Tag[]> = of(tagList.tags as Tag[])
    //   .pipe(
    //     tap(() => console.log('Creating tags')),
    //     mergeMap(tags => forkJoinConcurrent(
    //       tags.map(tag => this.tagService.createTag(tag.id, omit(tag, ['id']) as TagCreateRequest)),
    //       concurrency
    //     )),
    //     mapTo(tagList.tags as Tag[]),
    //     tap(tags => console.log('Tags created', tags))
    //   );

    // // Creates Organizations.
    // const createOrganizations$: Observable<Organization[]> = of(organizationList.organizations as Organization[])
    //   .pipe(
    //     tap(() => console.log('Creating organizations')),
    //     mergeMap(organizations => forkJoinConcurrent(
    //       organizations.map(org => this.organizationService.createOrganization(
    //         org.id, omit(org, ['id']) as OrganizationCreateRequest
    //       )),
    //       concurrency
    //     )),
    //     mapTo(organizationList.organizations as Organization[]),
    //     tap(organizations => console.log('Organizations created', organizations))
    //   );

    // // Creates Challenge Platforms.
    // const createChallengePlatforms$: Observable<ChallengePlatform[]> = of(
    //   challengePlatformList.challengePlatforms as ChallengePlatform[]
    // ).pipe(
    //   tap(() => console.log('Creating challenge platforms')),
    //   mergeMap((platforms) =>
    //     forkJoinConcurrent(
    //       platforms.map((platform) =>
    //         this.challengePlatformService.createChallengePlatform(
    //           platform.id,
    //           omit(platform, ['id']) as ChallengePlatformCreateRequest
    //         )
    //       ),
    //       concurrency
    //     )
    //   ),
    //   mapTo(challengePlatformList.challengePlatforms as ChallengePlatform[]),
    //   tap((platforms) => console.log('Challenge platforms created', platforms))
    // );

    // // Creates Grants.
    // const createGrants$: Observable<DocumentsCreateResult<Grant>> = of(grantList.grants as Grant[])
    //   .pipe(
    //     tap(grants => console.log('Creating grants')),
    //     mergeMap(grants => forkJoinConcurrent(
    //       grants.map(grant => this.grantService.createGrant(
    //         omit(grant, ['id']) as GrantCreateRequest
    //       )),
    //       concurrency
    //     )),
    //     map((grantCreateResponses: GrantCreateResponse[]) => {
    //       return {
    //         documents: _merge([], grantList.grants, grantCreateResponses),
    //         idMaps: _merge([], grantCreateResponses, grantList.grants.map(
    //           grant => ({ tmpId: grant.id })))
    //       } as DocumentsCreateResult<Grant>;
    //     }),
    //     tap(res => console.log('Grants created', res))
    //   );

    // // Creates Persons.
    // const createPersons$: Observable<DocumentsCreateResult<Person>> = of(personList.persons as Person[])
    //   .pipe(
    //     tap(persons => console.log('Creating persons')),
    //     mergeMap(persons => forkJoinConcurrent(
    //       persons.map(person => this.personService.createPerson(
    //         omit(person, ['id']) as PersonCreateRequest
    //       )),
    //       concurrency
    //     )),
    //     map((personCreateResponses: PersonCreateResponse[]) => {
    //       return {
    //         documents: _merge([], personList.persons, personCreateResponses),
    //         idMaps: _merge([], personCreateResponses, personList.persons.map(
    //           person => ({ tmpId: person.id })))
    //       } as DocumentsCreateResult<Person>;
    //     }),
    //     tap(res => console.log('Persons created', res))
    //   );

    // // Returns the Grant ids for a challenge.
    // const getGrantIds = (
    //   challengeCreateRequest: ChallengeCreateRequest,
    //   grantsCreateResult: DocumentsCreateResult<Grant>
    // ): Observable<string[]> => {
    //   return of(challengeCreateRequest)
    //     .pipe(
    //       map(rawChallenge => rawChallenge.grantIds
    //         .map(grantId => {
    //           const grant = grantsCreateResult.idMaps.find(idMap => idMap.tmpId === grantId);
    //           if (grant === undefined) {
    //             throw new Error('Grant with id ' + grantId + ' not found');
    //           }
    //           return grant.id;
    //         })
    //       )
    //     );
    // };

    // // Returns the Person ids for the organizers of a challenge.
    // const getOrganizerIds = (
    //   challengeCreateRequest: ChallengeCreateRequest,
    //   personsCreateResult: DocumentsCreateResult<Person>
    // ): Observable<string[]> => {
    //   return of(challengeCreateRequest)
    //     .pipe(
    //       map(rawChallenge => rawChallenge.organizerIds
    //         .map(organizerId => {
    //           const person = personsCreateResult.idMaps.find(idMap => idMap.tmpId === organizerId);
    //           if (person === undefined) {
    //             throw new Error('Organizer with id ' + organizerId + ' not found');
    //           }
    //           return person.id;
    //         })
    //       )
    //     );
    // };

    // Creates a Challenge
    const createChallenge = (
      accountName: string,
      rawChallenge: Challenge
    ): Observable<Challenge> => {
      return this.challengeService
        .createChallenge(accountName, rawChallenge)
        .pipe(
          map((res) => _merge(res, rawChallenge) as Challenge),
          switchMap((challenge) => {
            const readme: ChallengeReadmeUpdateRequest | undefined =
              challengeReadmeList.challengeReadmes.find(
                (readme) => readme.challengeId === rawChallenge.id
              );
            if (readme !== undefined) {
              return this.challengeService
                .updateChallengeReadme(accountName, challenge.name, readme)
                .pipe(mapTo(challenge));
            } else {
              return of(challenge);
            }
          })

          // switchMap((challenge) => {
          //   const readme: ChallengeReadmeCRequest | undefined =
          //     challengeReadmeList.challengeReadmes.find(
          //       (readme) => readme.challengeId === rawChallenge.id
          //     );
          //   if (readme === undefined) {
          //     throw new Error(
          //       'Challenge with tmpId ' + rawChallenge.id + ' has no readme'
          //     );
          //   }
          //   return this.challengeService
          //     .createChallengeReadme(accountName, challenge.name, readme)
          //     .pipe(mapTo(challenge));
          // })
        );
    };

    // Creates Challenges
    const createChallenges = (
      challengeCreateRequests: Challenge[],
      challengePlatformsCreateResult: DocumentsCreateResult<ChallengePlatform>,
      orgsCreateResult: DocumentsCreateResult<Organization>
    ): Observable<Challenge[]> => {
      return of(challengeCreateRequests).pipe(
        tap(() => console.log('Creating challenges')),
        mergeMap((rawChallenges) =>
          forkJoinConcurrent(
            rawChallenges.map((rawChallenge: Challenge) =>
              of(rawChallenge).pipe(
                mergeMap(() =>
                  forkJoin({
                    platformId: getObjectIdFromTmpId(
                      rawChallenge.platformId,
                      challengePlatformsCreateResult
                    ),
                    org: getObjectIdFromTmpId(
                      rawChallenge.ownerId,
                      orgsCreateResult
                    ).pipe(
                      switchMap((orgId) =>
                        this.organizationService.getOrganization(orgId)
                      )
                    ),
                  })
                ),
                mergeMap((res) => {
                  const org: Organization = res.org;
                  _merge(rawChallenge, omit(res, ['org']));
                  return createChallenge(org.login, rawChallenge);
                })
              )
            ),
            1
          )
        ),
        tap((challenges) => console.log('Challenge created', challenges))
      );
    };

    const createOrgMemberships = (
      orgMembershipCreateRequests: OrgMembershipCreateRequest[],
      organizationsCreateResult: DocumentsCreateResult<Organization>,
      usersCreateResult: DocumentsCreateResult<User>
    ): Observable<OrgMembership[]> => {
      return of(orgMembershipCreateRequests).pipe(
        tap(() => console.log('Creating org memberships')),
        mergeMap((rawOrgMemberships) =>
          forkJoinConcurrent(
            rawOrgMemberships.map(
              (rawOrgMembership: OrgMembershipCreateRequest) =>
                of(rawOrgMembership).pipe(
                  mergeMap(() =>
                    forkJoin({
                      organizationId: getObjectIdFromTmpId(
                        rawOrgMembership.organizationId,
                        organizationsCreateResult
                      ),
                      userId: getObjectIdFromTmpId(
                        rawOrgMembership.userId,
                        usersCreateResult
                      ),
                    })
                  ),
                  mergeMap((res) => {
                    _merge(rawOrgMembership, res);
                    return this.orgMembershipService.createOrgMembership(
                      rawOrgMembership
                    );
                  })
                )
            ),
            1
          )
        )
      );
    };

    console.log('Removing DB documents');
    const createIndependentDocuments$ = removeDocuments$.pipe(
      mergeMap(() =>
        forkJoin({
          usersCreateResult: createUsers$,
          organizationsCreateResult: createOrganizations$,
          challengePlatformsCreateResult: createChallengePlatforms$,
        })
      ),
      share()
    );

    const createOrgMemberships$ = createIndependentDocuments$.pipe(
      mergeMap((docs) =>
        createOrgMemberships(
          orgMembershipList.orgMemberships as OrgMembershipCreateRequest[],
          docs.organizationsCreateResult,
          docs.usersCreateResult
        )
      ),
      withLatestFrom(createIndependentDocuments$),
      map(([orgMembershipsCreateResult, docs]) => {
        return {
          orgMembershipsCreateResult: orgMembershipsCreateResult,
          ...docs,
        };
      }),
      share()
    );

    const createChallenges$ = createOrgMemberships$.pipe(
      mergeMap((docs) => {
        return createChallenges(
          challengeList.challenges as Challenge[],
          docs.challengePlatformsCreateResult as DocumentsCreateResult<ChallengePlatform>,
          docs.organizationsCreateResult as DocumentsCreateResult<Organization>
        );
      }),
      withLatestFrom(createOrgMemberships$),
      map(([challengesCreateResult, docs]) => {
        return {
          ...docs,
          challengesCreateResult: challengesCreateResult,
        };
      })
    );

    createChallenges$.subscribe(
      () => {
        console.log('DB seeding completed');
      },
      (err) => console.log(err)
    );
  }
}
