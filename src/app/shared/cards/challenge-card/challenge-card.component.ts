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
import { Router } from '@angular/router';
import { AuthService } from '@shared/auth/auth.service';
@Component({
  selector: 'rocc-challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.scss'],
})
export class ChallengeCardComponent implements OnInit {
  @Input() challenge!: Challenge;
  @Input() loggedIn!: boolean;
  platform$!: Observable<ChallengePlatform>;

  starred!: boolean;
  numberStarred!: number;

  // mock up data
  numberSubmissions: number = 200;
  numberRegistrants: number = 100;

  constructor(
    private router: Router,
    private authService: AuthService,
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
      )
      .subscribe();
  }

  toggleStar(event: Event): void {
    if (this.loggedIn) {
      this.starred = !this.starred;
      this.starService().subscribe();
    } else {
      this.authService.setRedirectUrl(this.router.url);
      this.router.navigate(['login']);
    }
    event.stopPropagation();
  }

  starService(): any {
    if (this.starred) {
      this.numberStarred += 1;
      return this.userService.starChallenge(
        this.challenge.fullName.split('/')[0],
        this.challenge.name
      );
    } else {
      this.numberStarred -= 1;
      return this.userService.unstarChallenge(
        this.challenge.fullName.split('/')[0],
        this.challenge.name
      );
    }
  }

  getStarredTooltip(): string {
    if (this.loggedIn) {
      return `${'Click the star to'} ${
        this.starred ? 'unstar' : 'star'
      } ${'this from your favorites'}`;
    } else {
      return 'You must be logged in to star a challenge';
    }
  }

  toggleLink(event: Event): void {
    event.stopPropagation();
  }
}
