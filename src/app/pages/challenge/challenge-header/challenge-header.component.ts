import { Component, OnInit, Input } from '@angular/core';
import {
  ChallengePlatformService,
  Challenge,
  ChallengePlatform,
} from '@sage-bionetworks/rocc-client-angular';
import { Observable } from 'rxjs';
import { ChallengeDataService } from '../challenge-data.service';

@Component({
  selector: 'rocc-challenge-header',
  templateUrl: './challenge-header.component.html',
  styleUrls: ['./challenge-header.component.scss'],
})
export class ChallengeHeaderComponent implements OnInit {
  @Input() accountName = '';
  @Input() challenge!: Challenge;
  starred = false;

  progressValue!: number;
  remainDays!: number | undefined;
  platform$!: Observable<ChallengePlatform>;

  constructor(
    private challengePlatformService: ChallengePlatformService,
    private challengeDataService: ChallengeDataService
  ) {}

  ngOnInit(): void {
    this.platform$ = this.challengePlatformService.getChallengePlatform(
      this.challenge?.platformId!
    );

    this.challengeDataService
      .getStarred()
      .subscribe((starred) => (this.starred = starred));

    this.progressValue =
      this.challenge.status == 'active'
        ? (this.progressValue =
            this.challenge.startDate !== undefined &&
            this.challenge.endDate !== undefined
              ? this.calcProgress(
                  new Date().toUTCString(),
                  this.challenge.startDate!,
                  this.challenge.endDate!
                )
              : 0)
        : this.challenge.status == 'completed'
        ? 100
        : 0;

    this.remainDays =
      this.challenge.endDate !== undefined
        ? this.calcDays(new Date().toUTCString(), this.challenge.endDate!)
        : undefined;
  }

  calcDays(startDate: string, endDate: string): number {
    let timeDiff = +new Date(endDate) - +new Date(startDate);
    return Math.round(timeDiff / (1000 * 60 * 60 * 24));
  }

  calcProgress(today: string, startDate: string, endDate: string): number {
    return (
      (this.calcDays(startDate, today) / this.calcDays(startDate, endDate)) *
      100
    );
  }

  toggleStarred() {
    this.starred = !this.starred;
    this.challengeDataService
      .toggleStarred()
      .subscribe((starred) => console.log('Challenge starred', starred));
  }
}
