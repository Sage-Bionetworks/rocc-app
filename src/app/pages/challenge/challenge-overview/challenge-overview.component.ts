import { Component, OnInit } from '@angular/core';
import { isDefined } from '@app/type-guards';
import {
  Challenge,
  ChallengeService,
  ChallengeReadme,
} from '@sage-bionetworks/rocc-client-angular';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ChallengeDataService } from '../challenge-data.service';

@Component({
  selector: 'rocc-challenge-overview',
  templateUrl: './challenge-overview.component.html',
  styleUrls: ['./challenge-overview.component.scss'],
})
export class ChallengeOverviewComponent implements OnInit {
  challenge!: Challenge | undefined;
  readme$!: Observable<ChallengeReadme | null>;

  constructor(
    private challengeService: ChallengeService,
    private challengeDataService: ChallengeDataService
  ) {}

  ngOnInit(): void {
    this.challengeDataService.getChallenge().subscribe((challenge) => {
      this.challenge = challenge;
    });

    this.readme$ = this.challengeDataService.getReadme().pipe(
      tap(readme => console.log('PLOP')),
      switchMap((readme) => {
        if (readme === null) {
          console.log('README is null');
          return this.challengeDataService.getChallenge().pipe(
            tap(challenge => console.log('challenge is', challenge)),
            filter(isDefined),
            switchMap((challenge) =>
              this.challengeService
                .getChallengeReadme(
                  challenge.fullName.split('/')[0],
                  challenge.name
                )
                .pipe(
                  tap((readme_) => this.challengeDataService.setReadme(readme_))
                )
            )
          );
        } else {
          return of(readme)
        }
      })
    );
  }
}
