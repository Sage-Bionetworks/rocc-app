import { Component, OnInit } from '@angular/core';
import { Challenge } from '@sage-bionetworks/rocc-client-angular';
import { ChallengeDataService } from '../challenge-data.service';

@Component({
  selector: 'rocc-challenge-overview',
  templateUrl: './challenge-overview.component.html',
  styleUrls: ['./challenge-overview.component.scss'],
})
export class ChallengeOverviewComponent implements OnInit {
  challenge!: Challenge | undefined;

  constructor(private challengeDataService: ChallengeDataService) {}

  ngOnInit(): void {
    this.challengeDataService.getChallenge().subscribe((challenge) => {
      this.challenge = challenge;
    });
  }
}
