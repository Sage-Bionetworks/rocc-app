import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import {
  Challenge,
  ChallengeService,
  ChallengeReadme,
} from '@sage-bionetworks/rocc-client-angular';
import { isDefined, isUndefined } from '@app/type-guards';

@Injectable({
  providedIn: 'root',
})
export class ChallengeDataService {
  private challenge: BehaviorSubject<Challenge | undefined> =
    new BehaviorSubject<Challenge | undefined>(undefined);
  private readme: BehaviorSubject<ChallengeReadme | null> =
    new BehaviorSubject<ChallengeReadme | null>(null);

  constructor(private challengeService: ChallengeService) {}

  setChallenge(challenge: Challenge | undefined): void {
    this.readme.next(null);
    this.challenge.next(challenge);
  }

  getChallenge(): Observable<Challenge> {
    return this.challenge.pipe(filter(isDefined));
  }

  setReadme(readme: ChallengeReadme | null): void {
    this.readme.next(readme);
  }

  getReadme(): Observable<ChallengeReadme> {
    const getReadmeFromCache = this.readme.pipe(filter(isDefined));

    const getReadmeFromApi = (
      challenge: Challenge
    ): Observable<ChallengeReadme> => {
      return this.readme.pipe(
        filter(isUndefined),
        switchMap(() =>
          this.challengeService.getChallengeReadme(
            challenge.fullName.split('/')[0],
            challenge.name
          )
        ),
        tap((readme) => this.readme.next(readme))
      );
    };

    return this.getChallenge().pipe(
      switchMap((challenge) =>
        merge(getReadmeFromCache, getReadmeFromApi(challenge))
      )
    );
  }
}
