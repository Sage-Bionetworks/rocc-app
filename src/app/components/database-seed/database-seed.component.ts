import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import {
  ChallengeService,
  OrganizationService,
  PersonService,
  TagService
} from '@sage-bionetworks/rocc-client-angular';
import { Tag } from '@sage-bionetworks/rocc-client-angular';
import tagList from '../../seeds/dream/tags.json';
import orgList from '../../seeds/dream/organizations.json';

@Component({
  selector: 'rocc-database-seed',
  templateUrl: './database-seed.component.html',
  styleUrls: ['./database-seed.component.scss']
})
export class DatabaseSeedComponent implements OnInit {

  constructor(
    private challengeService: ChallengeService,
    private organizationService: OrganizationService,
    private personService: PersonService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    const removeDocuments$ = forkJoin([
      this.challengeService.deleteAllChallenges(),
      this.organizationService.deleteAllOrganizations(),
      this.personService.deleteAllPersons(),
      this.tagService.deleteAllTags(),
    ]);

    const tags: Tag[] = tagList.tags;
    const organizations = orgList.organizations;

    const addTags$ = forkJoin(
      tags.map(tag => this.tagService.createTag(tag.id, {
        description: tag.description
      }))
    );

    const addOrganizations$ = forkJoin(
      organizations.map(org => this.organizationService.createOrganization(
        org.organizationId, {
          name: org.name,
          url: org.url,
          shortName: org.shortName
        }
      ))
    );

    removeDocuments$
      .pipe(
        mergeMap(() => addTags$),
        tap(console.log),
        // mergeMap(() => addOrganizations$),
        // tap(console.log),
      )
      .subscribe(res => {
        console.log('done');
      }, err => console.log);
  }
}
