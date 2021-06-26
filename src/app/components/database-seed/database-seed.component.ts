import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, defer, forkJoin, of, pipe, Observable } from 'rxjs';
import { last, mapTo, mergeAll, mergeMap, switchMap, tap } from 'rxjs/operators';
import {
  ChallengeService,
  GrantService,
  OrganizationService,
  PersonService,
  TagService
} from '@sage-bionetworks/rocc-client-angular';
import {
  Organization,
  PersonCreateRequest,
  Tag,
  TagCreateResponse
} from '@sage-bionetworks/rocc-client-angular';
import tagList from '../../seeds/dream/tags.json';
import orgList from '../../seeds/dream/organizations.json';
import challengeList from '../../seeds/dream/challenges.json';
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

    const concurreny = 5;

    // Objects with pre-defined IDs
    const tags: Tag[] = tagList.tags;
    const organizations: Organization[] = orgList.organizations;
    // Objects
    const rawChallenges: any = challengeList.challenges;

    const addTags$ = pipe(
      tap(() => console.log('Creating tags')),
      mergeMap(() => forkJoinConcurrent(
        tags.map(tag => this.tagService.createTag(tag.id, {
          description: tag.description
        })),
        concurreny
      )),
      tap(() => console.log('Tags created', tags))
    );

    const addOrganizations$ = pipe(
      tap(() => console.log('Creating organizations')),
      mergeMap(() => forkJoinConcurrent(
        organizations.map(org => this.organizationService.createOrganization(
          org.id, {
            name: org.name,
            url: org.url,
            shortName: org.shortName
          }
        )),
        concurreny
      )),
      tap(() => console.log('Organizations created', organizations))
    );

    console.log('Removing DB documents');
    removeDocuments$
      .pipe(
        addTags$,
        addOrganizations$
      ).subscribe(() => {
        console.log('The seeding of the DB successfully completed');
      }, err => console.log(err));







    // const addChallenges$ = pipe(
    //   tap(() => console.log('Creating challenges')),
    //   mergeMap(() => forkJoin(
    //     rawChallenges.map((rawchallenge: any) => of(rawchallenge).pipe(
    //       tap(() => console.log("Creating organizers for challenge " + rawchallenge.name)),
    //       mergeMap(() => forkJoin(
    //         rawchallenge.organizerIds.map((rawOrganizer: PersonCreateRequest) => this.personService.createPerson(
    //           {
    //             firstName: rawOrganizer.firstName,
    //             lastName: rawOrganizer.lastName,
    //             organizationIds: rawOrganizer.organizationIds
    //           }
    //         ))
    //       )),
    //     )),
    //       // tap(() => console.log("")),
    //       // mergeMap(() => forkJoin(
    //       //   rawchallenge.organizerIds.map((rawOrganizer: PersonCreateRequest) => this.personService.createPerson(
    //       //     {
    //       //       firstName: rawOrganizer.firstName,
    //       //       lastName: rawOrganizer.lastName,
    //       //       organizationIds: rawOrganizer.organizationIds
    //       //     }
    //       //   ))
    //       // )),
    //     //   switchMap(() => of(null))
    //     // ))
    //   )),
    //   tap(challenges => console.log('Challenge created', challenges))
    // );








    // const addOrganizers$ = forkJoin(
    //   challenges.map((dream: any) => {
    //     if (dream.organizerIds.length === 0) {
    //       return of([]); // return [] obs if a challenge does not have organizers info
    //     } else {
    //       return forkJoin(
    //         dream.organizerIds.map((person: any) => {
    //           return this.personService.createPerson(
    //             {
    //               firstName: person.firstName,
    //               lastName: person.lastName,
    //               organizationIds: person.organizationIds
    //             }
    //           );
    //         })
    //       );
    //     }
    //   })
    // );

    // // take inx of challenges and array of personIds
    // const addChallenges$ = (inx: number, personIds: string[]) =>
    //   this.challengeService.createChallenge(
    //     {
    //     // TODO: let latest schema allow empty array
    //     // have not successfully test seeding challenges function
    //     // some challenges have no `startDate`, `endDate`, `organizerIds` or `dataProviderIds` or `grantIds`
    //     name: challenges[inx].name,
    //     description: challenges[inx].description,
    //     url : challenges[inx].url,
    //     // have not tested this yet for optional start/end date
    //     startDate: challenges[inx].startDate ? challenges[inx].startDate : null,
    //     endDate: challenges[inx].endDate ? challenges[inx].endDate : null,
    //     status: challenges[inx].status,
    //     tagIds: challenges[inx].tagIds,
    //     organizerIds: personIds,
    //     dataProviderIds: challenges[inx].dataProviderIds,
    //     grantIds: []
    //     }
    //   );

    // console.log('Removing DB documents');
    // removeDocuments$
    //   .pipe(
    //     addTags$,
    //     // addOrganizations$,
    //     // addChallenges$
    //     // tap(() => console.log('Seeding tags')),
    //     // mergeMap(() => addTags$),
    //     // tap(() => console.log('Seeding organizations')),
    //     // mergeMap(() => addOrganizations$),
    //     // tap(() => console.log('Seeding persons >>>>>>>>>>>>')),
    //     // mergeMap(() => addOrganizers$),
    //     // // tap(console.log),
    //     // mergeMap(allPersonRes => {  // iterate all person create responses each challenges
    //     //   return forkJoin(
    //     //     allPersonRes.map(
    //     //       (personIdObs: any) => {  // iterate each person create responses in one challenge
    //     //         const inx = allPersonRes.indexOf(personIdObs);  // save inx of challenge
    //     //         // save each personId from response to an array
    //     //         const personIds: string[] = [];
    //     //         personIdObs.map((personId: any) => personIds.push(personId.id));
    //     //         console.log('Seeding challenge: ', challenges[inx].name, '>>>>>>>>>>>>');
    //     //         return addChallenges$(inx, personIds);
    //     //       })
    //     //     );
    //     // })
    //   ).subscribe(() => {
    //     console.log('The seeding of the DB successfully completed');
    //   }, err => console.log(err));
  }
}
