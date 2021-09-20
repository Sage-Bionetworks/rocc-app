import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mapTo,
  share,
  switchMap,
} from 'rxjs/operators';
import { PageTitleService } from '@sage-bionetworks/sage-angular';
import {
  ChallengeService,
  Challenge,
  ModelError as RoccClientError,
  UserService,
} from '@sage-bionetworks/rocc-client-angular';
import { isRoccClientError } from '@shared/rocc-client-error';
import { ChallengeDataService } from './challenge-data.service';
import { isDefined } from '@app/type-guards';
import { AuthService } from '@shared/auth/auth.service';

@Component({
  selector: 'rocc-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss'],
})
export class ChallengeComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;
  challenge$!: Observable<Challenge | undefined>;
  challengeNotFound = false;
  accountName = '';

  sections = [
    {
      label: 'Overview',
      path: '.',
    },
    {
      label: 'Settings',
      path: 'settings',
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private challengeService: ChallengeService,
    private pageTitleService: PageTitleService,
    private challengeDataService: ChallengeDataService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.challenge$ = this.route.params.pipe(
      switchMap((params) => {
        this.accountName = params.login;
        return this.challengeDataService.fetchChallenge(
          params.login,
          params.challengeName
        );
      }),
      catchError((err) => {
        const error = err.error as RoccClientError;
        if (isRoccClientError(error)) {
          if (error.status == 404) {
            return of(undefined);
          }
        }
        return throwError(err);
      })
    );

    const starred$ = this.authService.isSignedIn().pipe(
      filter(isSignedIn => isSignedIn),
      switchMap(() => this.challengeDataService.fetchStarred())
    );

    starred$.subscribe();

    this.challenge$.subscribe((challenge) => {
      const pageTitle = challenge ? `${challenge.name}` : 'Page not found';
      this.pageTitleService.setTitle(`${pageTitle} · ROCC`);
      this.challengeNotFound = !challenge;
    });
  }
}
