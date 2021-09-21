import { Component, Input, OnInit } from '@angular/core';
import {
  Challenge,
  ChallengePlatformService,
  ChallengePlatform,
} from '@sage-bionetworks/rocc-client-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'rocc-challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.scss'],
})
export class ChallengeCardComponent implements OnInit {
  @Input() challenge!: Challenge;
  platform$!: Observable<ChallengePlatform>;

  // mock up data
  numberSubmissions: number = 200;
  numberRegistrants: number = 100;

  constructor(private challengePlatformService: ChallengePlatformService) {}

  ngOnInit(): void {
    this.platform$ = this.challengePlatformService.getChallengePlatform(
      this.challenge.platformId!
    );
  }
}
