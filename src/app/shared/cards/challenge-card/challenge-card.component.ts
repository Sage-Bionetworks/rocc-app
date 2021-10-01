import { Component, Input, OnInit } from '@angular/core';
import {
  Challenge,
  ChallengeService,
  ChallengePlatformService,
  ChallengePlatform,
  UserService,
  ModelError as RoccClientError,
} from '@sage-bionetworks/rocc-client-angular';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { isRoccClientError } from '@app/shared/rocc-client-error';

@Component({
  selector: 'rocc-challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.scss'],
})
export class ChallengeCardComponent implements OnInit {
  @Input() challenge!: Challenge;
  @Input() loggedIn!: boolean;
  platform$!: Observable<ChallengePlatform>;

  starred: boolean = false;
  numberStarred: number = 0;

  // mock up data
  numberSubmissions: number = 200;
  numberRegistrants: number = 100;

  constructor(
    private challengePlatformService: ChallengePlatformService,
    private userService: UserService,
    private challengeService: ChallengeService
  ) {}

  ngOnInit(): void {
    this.platform$ = this.challengePlatformService.getChallengePlatform(
      this.challenge.platformId!
    );

    this.challengeService
      .listChallengeStargazers(
        this.challenge.fullName.split('/')[0],
        this.challenge.name,
        100
      )
      .subscribe((page) => (this.numberStarred = page.totalResults));

    this.userService
      .isStarredChallenge(
        this.challenge.fullName.split('/')[0],
        this.challenge.name
      )
      .pipe(
        mapTo(true),
        catchError((err) => {
          const error = err.error as RoccClientError;
          if (isRoccClientError(error)) {
            if (error.status == 404) {
              return of(false);
            }
          }
          throwError(err);
          return of(false);
        }),
        tap((starred: boolean) => (this.starred = starred))
      );
  }

  toggleStar(event: Event): void {
    event.stopPropagation();
    this.starred = !this.starred;
    if (this.starred) {
      this.userService.starChallenge(
        this.challenge.fullName.split('/')[0],
        this.challenge.name
      );
      this.numberStarred += 1;
    } else {
      this.userService.unstarChallenge(
        this.challenge.fullName.split('/')[0],
        this.challenge.name
      );
      this.numberStarred -= 1;
    }
  }

  getStarredTooltip(): string {
    return `${'Click the star to'} ${
      this.starred ? 'unstar' : 'star'
    } ${'this from your favorites'}`;
  }

  toggleLink(event: Event): void {
    event.stopPropagation();
  }
}
