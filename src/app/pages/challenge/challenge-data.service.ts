import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Challenge } from '@sage-bionetworks/rocc-client-angular';

@Injectable({
  providedIn: 'root',
})
export class ChallengeDataService {
  private challenge: BehaviorSubject<Challenge | undefined> =
    new BehaviorSubject<Challenge | undefined>(undefined);

  constructor() {}

  setChallenge(challenge: Challenge | undefined): void {
    this.challenge.next(challenge);
  }

  getChallenge(): Observable<Challenge | undefined> {
    return this.challenge.asObservable();
    // .pipe(filter((challenge) => challenge !== undefined));
  }
}
