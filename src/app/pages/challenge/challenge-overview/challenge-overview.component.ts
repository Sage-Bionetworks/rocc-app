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
  challenge$!: Observable<Challenge | undefined>;
  readme$!: Observable<ChallengeReadme | null>;

  constructor(
    private challengeService: ChallengeService,
    private challengeDataService: ChallengeDataService
  ) {}

  ngOnInit(): void {
    this.challenge$ = this.challengeDataService.getChallenge();

    this.readme$ = this.challengeDataService.getReadme().pipe(
      switchMap((readme) => {
        if (readme === null) {
          return this.challenge$.pipe(
            filter(isDefined),
            tap(() => console.log('fetch readme')),
            switchMap((challenge) =>
              this.challengeService
                .getChallengeReadme(
                  challenge.fullName.split('/')[0],
                  challenge.name
                )
                .pipe(
                  // cache the readme
                  tap((readme_) => this.challengeDataService.setReadme(readme_))
                )
            )
          );
        } else {
          return of(readme);
        }
      })
    );
  }
}
