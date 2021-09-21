import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import {
  Challenge,
  ChallengeService,
  User,
  ModelError as RoccClientError,
} from '@sage-bionetworks/rocc-client-angular';
import { isDefined } from '@app/type-guards';
import { isRoccClientError } from '@shared/rocc-client-error';
import { ChallengeDataService } from '../challenge-data.service';

@Component({
  selector: 'rocc-challenge-stargazers',
  templateUrl: './challenge-stargazers.component.html',
  styleUrls: ['./challenge-stargazers.component.scss'],
})
export class ChallengeStargazersComponent implements OnInit {
  challenge$!: Observable<Challenge>;
  stargazers$!: Observable<User[]>;

  constructor(
    private challengeService: ChallengeService,
    private challengeDataService: ChallengeDataService
  ) {}

  ngOnInit(): void {
    this.challenge$ = this.challengeDataService.getChallenge();
    this.stargazers$ = this.fetchStargazers();
  }

  fetchStargazers(): Observable<User[]> {
    return this.challenge$.pipe(
      filter(isDefined),
      switchMap((challenge) =>
        this.challengeService.listChallengeStargazers(
          challenge.fullName.split('/')[0],
          challenge.name
        )
      ),
      map((page) => page.users),
      catchError((err) => {
        const error = err.error as RoccClientError;
        if (isRoccClientError(error)) {
          if (error.status == 404) {
            return of([]);
          }
        }
        throwError(err);
        return of([]);
      })
    );
  }
}
