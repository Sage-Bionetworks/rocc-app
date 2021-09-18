import { Component, Input, OnInit } from '@angular/core';
import {
  Challenge,
  ChallengePlatformService,
  ChallengePlatform,
} from '@sage-bionetworks/rocc-client-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'rocc-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.scss'],
})
export class ChallengeViewComponent implements OnInit {
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
