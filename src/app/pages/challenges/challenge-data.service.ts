import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Challenge } from '@sage-bionetworks/rocc-client-angular';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChallengeDataService implements OnDestroy {
  private _challenge: BehaviorSubject<Challenge | null> = new BehaviorSubject<Challenge | null>(null);

  constructor() { }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  public setChallenge(challenge: Challenge): void {
    console.log('challenge data service is now', challenge);
    this._challenge.next(challenge);
    // this.socketEventName = `tool:${tool._id}`;
    // this.socketService.syncItemSubject(this.socketEventName, this._tool);
  }

  challenge(): Observable<Challenge | null> {
    return this._challenge
      .asObservable()
      .pipe(filter((challenge) => !!challenge));
  }
}
