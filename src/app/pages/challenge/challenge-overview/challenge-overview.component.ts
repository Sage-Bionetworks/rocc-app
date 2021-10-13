import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Challenge,
  ChallengeReadme,
  ChallengeService,
  ChallengeOrganizerList,
} from '@sage-bionetworks/rocc-client-angular';
import { ChallengeDataService } from '../challenge-data.service';

@Component({
  selector: 'rocc-challenge-overview',
  templateUrl: './challenge-overview.component.html',
  styleUrls: ['./challenge-overview.component.scss'],
})
export class ChallengeOverviewComponent implements OnInit {
  challenge$!: Observable<Challenge>;
  readme$!: Observable<ChallengeReadme>;
  organizers!: Observable<any>;
  constructor(
    private challengeDataService: ChallengeDataService,
    private challengeService: ChallengeService
  ) {}

  ngOnInit(): void {
    this.challenge$ = this.challengeDataService.getChallenge();
    this.readme$ = this.challengeDataService.getReadme();
  }
}
