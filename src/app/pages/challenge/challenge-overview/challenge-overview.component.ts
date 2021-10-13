import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import {
  Challenge,
  ChallengeReadme,
  ChallengeService,
  ChallengeOrganizerList,
  ChallengeOrganizer,
} from '@sage-bionetworks/rocc-client-angular';
import { ChallengeDataService } from '../challenge-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rocc-challenge-overview',
  templateUrl: './challenge-overview.component.html',
  styleUrls: ['./challenge-overview.component.scss'],
})
export class ChallengeOverviewComponent implements OnInit {
  accountName!: string;
  challenge!: Challenge;
  organizers!: ChallengeOrganizer[];
  readme$!: Observable<ChallengeReadme>;

  constructor(
    private route: ActivatedRoute,
    private challengeDataService: ChallengeDataService,
    private challengeService: ChallengeService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((params) => (this.accountName = params.login)),
        switchMap(() => this.challengeDataService.getChallenge()),
        tap((challenge) => (this.challenge = challenge)),
        switchMap(() =>
          this.challengeService.listChallengeOrganizers(
            this.accountName,
            this.challenge.name
          )
        )
      )
      .subscribe(
        (organizerList: ChallengeOrganizerList) =>
          (this.organizers = organizerList.challengeOrganizers)
      );
    this.readme$ = this.challengeDataService.getReadme();
  }
}
