import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  ChallengePlatformService,
  Challenge,
  ChallengePlatform,
} from '@sage-bionetworks/rocc-client-angular';
import { AuthService } from '@shared/auth/auth.service';
import { ChallengeDataService } from '../challenge-data.service';
import {
  MatTooltipDefaultOptions,
  MAT_TOOLTIP_DEFAULT_OPTIONS,
} from '@angular/material/tooltip';

// TODO Make this object re-usable across the app
/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 500,
  hideDelay: 0,
  touchendHideDelay: 1000,
};

@Component({
  selector: 'rocc-challenge-header',
  templateUrl: './challenge-header.component.html',
  styleUrls: ['./challenge-header.component.scss'],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults },
  ],
})
export class ChallengeHeaderComponent implements OnInit {
  @Input() accountName = '';
  @Input() challenge!: Challenge;
  starred = false;
  loggedIn = false;

  progressValue!: number;
  remainDays!: number | undefined;
  platform$!: Observable<ChallengePlatform>;

  constructor(
    private router: Router,
    private challengePlatformService: ChallengePlatformService,
    private challengeDataService: ChallengeDataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.platform$ = this.challengePlatformService.getChallengePlatform(
      this.challenge?.platformId!
    );

    this.challengeDataService
      .getStarred()
      .subscribe((starred) => (this.starred = starred));

    this.authService
      .isSignedIn()
      .subscribe((loggedIn) => (this.loggedIn = loggedIn));

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

  toggleStarred(): void {
    if (this.loggedIn) {
      this.starred = !this.starred;
      this.challengeDataService.toggleStarred().subscribe();
    } else {
      this.authService.setRedirectUrl(this.router.url);
      this.router.navigate(['login']);
    }
  }

  getStarredTooltip(): string {
    if (this.loggedIn) {
      return (
        'Click to ' +
        (this.starred ? 'unstar' : 'star') +
        ' this from your favorites'
      );
    } else {
      return 'You must be logged in to star a challenge';
    }
  }
}
