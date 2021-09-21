import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Challenge,
  ChallengeReadme,
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
  mockTopics = ['ehr', 'cancer', 'disease', 'covid', 'health', 'sage'];
  constructor(private challengeDataService: ChallengeDataService) {}

  ngOnInit(): void {
    this.challenge$ = this.challengeDataService.getChallenge();
    this.readme$ = this.challengeDataService.getReadme();
  }
}
