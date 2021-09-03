import { Component, OnInit } from '@angular/core';
import { Challenge } from '@sage-bionetworks/rocc-client-angular';
import { ChallengeDataService } from '../challenge-data.service';

@Component({
  selector: 'rocc-challenge-settings',
  templateUrl: './challenge-settings.component.html',
  styleUrls: ['./challenge-settings.component.scss'],
})
export class ChallengeSettingsComponent implements OnInit {
  challenge!: Challenge | undefined;

  constructor(private challengeDataService: ChallengeDataService) {}

  ngOnInit(): void {
    this.challengeDataService.getChallenge().subscribe((challenge) => {
      this.challenge = challenge;
    });
  }
}
