import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ChallengeService,
  OrganizationService,
  PersonService
} from '@sage-bionetworks/rocc-client-angular';
import {
  Challenge,
  Organization,
  Person
} from '@sage-bionetworks/rocc-client-angular';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PageTitleService } from 'src/app/components/page-title/page-title.service';
@Component({
  selector: 'rocc-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.scss'],
})
export class ChallengeViewComponent implements OnInit {
  // challenge$!: Observable<Challenge>;
  challenge: any;
  personList: Person[] = [];
  orgList: Organization[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private challengeService: ChallengeService,
    private organizationService: OrganizationService,
    private personService: PersonService,
    private pageTitleService: PageTitleService
  ) {}


  ngOnInit(): void {
    // this.challenge$ = this.route.params.pipe(
    //   switchMap((params) => this.challengeService.getChallenge(params.id))
    // );

    this.route.params.pipe(
      switchMap((params) => this.challengeService.getChallenge(params.id)),
      tap(challengeRes => {
        this.challenge = challengeRes;
        this.pageTitleService.setTitle(challengeRes.name);
      }),
      switchMap(challenge => 
        forkJoin(
          challenge.organizerIds
            .map(organizerId => this.personService.getPerson(organizerId))
        )
      ),
      tap((persons)=> this.personList = persons),
      switchMap((persons) => {
        const orgIds = [...new Set(persons.flatMap(person => person.organizationIds))]
        return  forkJoin(
          orgIds
            .map((orgId) => this.organizationService.getOrganization(orgId))
        )
      }),
      tap(org => this.orgList = org)
    ).subscribe(
      () => console.log("done")
    );
    // this.challenge$.subscribe(challenge => {
    //   this.pageTitleService.setTitle(challenge.name);
    // });
  }

  getProgress(challenge: Challenge): number {

    if (challenge.status == "active") {
      
      const nowDate = new Date
      const startTime = (typeof challenge.startDate !== "undefined") ? new Date(challenge.startDate) : 0;
      const endTime = (typeof challenge.endDate !== "undefined") ? new Date(challenge.endDate) : 0;

      return +endTime - +startTime/+nowDate - +startTime * 100
      
    } else {

      return challenge.status == 'completed' ? 100 : 0
    }
  }
}
