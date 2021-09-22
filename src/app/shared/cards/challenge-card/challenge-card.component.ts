import { Component, Input, OnInit } from '@angular/core';
import {
  Challenge,
  ChallengePlatformService,
  ChallengePlatform,
  UserService,
  ModelError as RoccClientError,
} from '@sage-bionetworks/rocc-client-angular';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { isRoccClientError } from '@app/shared/rocc-client-error';

@Component({
  selector: 'rocc-challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.scss'],
})
export class ChallengeCardComponent implements OnInit {
  @Input() challenge!: Challenge;
  @Input() loggedIn!: boolean;
  starred: boolean = false;

  platform$!: Observable<ChallengePlatform>;

  // mock up data
  numberSubmissions: number = 200;
  numberRegistrants: number = 100;

  constructor(
    private challengePlatformService: ChallengePlatformService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.platform$ = this.challengePlatformService.getChallengePlatform(
      this.challenge.platformId!
    );

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
        })
      )
      .subscribe((starred) => (this.starred = starred));
  }

  toggleStar(): void {
    this.starred = !this.starred;

    (this.starred
      ? this.userService.starChallenge(
          this.challenge.fullName.split('/')[0],
          this.challenge.name
        )
      : this.userService.unstarChallenge(
          this.challenge.fullName.split('/')[0],
          this.challenge.name
        )
    ).subscribe(console.log);
  }
}
