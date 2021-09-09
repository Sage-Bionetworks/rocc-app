import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { PageTitleService } from '@sage-bionetworks/sage-angular';
import {
  ChallengeService,
  // ChallengePlatformService,
  Challenge,
  // ChallengePlatform,
  ModelError as RoccClientError,
} from '@sage-bionetworks/rocc-client-angular';
import { isRoccClientError } from '@shared/rocc-client-error';
import { ChallengeDataService } from './challenge-data.service';

@Component({
  selector: 'rocc-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss'],
})
export class ChallengeComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;
  challenge$!: Observable<Challenge | undefined>;
  // platform$!: Observable<ChallengePlatform | undefined>;
  challengeNotFound = false;

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
    private challengeService: ChallengeService,
    // private challengePlatformService: ChallengePlatformService,
    private pageTitleService: PageTitleService,
    private challengeDataService: ChallengeDataService
  ) {}

  ngOnInit(): void {
    this.challenge$ = this.route.params.pipe(
      switchMap((params) =>
        this.challengeService.getChallenge(params.login, params.challengeName)
      ),
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

    this.challenge$.subscribe((challenge) => {
      const pageTitle = challenge ? `${challenge.name}` : 'Page not found';
      this.pageTitleService.setTitle(`${pageTitle} · ROCC`);
      this.challengeNotFound = !challenge;
      this.challengeDataService.setChallenge(challenge);
      // this.platform$ = this.challengePlatformService.getChallengePlatform(
      //   challenge.platformId
      // );
    });
  }
}
