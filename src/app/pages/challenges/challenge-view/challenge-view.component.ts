import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
import { forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PageTitleService } from '@shared/page-title/page-title.service';

@Component({
  selector: 'rocc-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.scss'],
})
export class ChallengeViewComponent implements OnInit {

  @Input() selected!: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  // challenge$!: Observable<Challenge>;
  challenge!: Challenge;
  personList: Person[] = [];
  orgList: Organization[] = [];
  progressValue: number = 0;

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
    // this.challenge$.subscribe(challenge => {
    //   this.pageTitleService.setTitle(challenge.name);
    // });
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
  }

  getProgress(challenge: Challenge): number {

    if (challenge.status == "active") {
      // if either of start/endDates not provided, still show progress bar, but return zero
      if ((typeof challenge.startDate !== "undefined") && (typeof challenge.endDate !== "undefined")) {
        const totalTime = +new Date(challenge.endDate) - +new Date(challenge.startDate)
        const runTime = +new Date - +new Date(challenge.startDate)
        this.progressValue = runTime/totalTime * 100
      }
    } else {
      this.progressValue = challenge.status == 'completed' ? 100 : 0
    }

    return this.progressValue
  }

  public toggleSelected() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }
}
