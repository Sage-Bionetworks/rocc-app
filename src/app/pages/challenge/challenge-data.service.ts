import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Challenge } from '@sage-bionetworks/rocc-client-angular';
import { ChallengeReadme } from 'rocc-client-angular/projects/rocc-client/src';

@Injectable({
  providedIn: 'root',
})
export class ChallengeDataService {
  private challenge: BehaviorSubject<Challenge | undefined> =
    new BehaviorSubject<Challenge | undefined>(undefined);
  private readme: BehaviorSubject<ChallengeReadme | null> =
    new BehaviorSubject<ChallengeReadme | null>(null);

  constructor() {}

  setChallenge(challenge: Challenge | undefined): void {
    this.challenge.next(challenge);
  }

  getChallenge(): Observable<Challenge | undefined> {
    return this.challenge.asObservable();
    // .pipe(filter((challenge) => challenge !== undefined));
  }

  setReadme(readme: ChallengeReadme | null): void {
    this.readme.next(readme);
  }

  getReadme(): Observable<ChallengeReadme | null> {
    return this.readme.asObservable();
  }
}
