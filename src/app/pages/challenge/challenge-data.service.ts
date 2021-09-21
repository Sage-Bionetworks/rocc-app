import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  merge,
  throwError,
  combineLatest,
} from 'rxjs';
import {
  catchError,
  filter,
  mapTo,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import {
  Challenge,
  ChallengeService,
  ChallengeReadme,
  ModelError as RoccClientError,
  UserService,
  User,
} from '@sage-bionetworks/rocc-client-angular';
import { isDefined, isUndefined } from '@app/type-guards';
import { of } from 'rxjs';
import { isRoccClientError } from '@app/shared/rocc-client-error';

@Injectable({
  providedIn: 'root',
})
export class ChallengeDataService {
  private challenge: BehaviorSubject<Challenge | undefined> =
    new BehaviorSubject<Challenge | undefined>(undefined);
  private readme: BehaviorSubject<ChallengeReadme | null> =
    new BehaviorSubject<ChallengeReadme | null>(null);
  private starred: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private challengeService: ChallengeService,
    private userService: UserService
  ) {}

  fetchChallenge(owner: string, name: string): Observable<Challenge> {
    return this.challengeService.getChallenge(owner, name).pipe(
      tap((challenge) => this.challenge.next(challenge)),
      switchMap(() => this.challenge.asObservable()),
      filter(isDefined)
    );
  }

  setChallenge(challenge: Challenge | undefined): void {
    this.readme.next(null);
    this.starred.next(false);
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

  fetchStarred(): Observable<boolean> {
    return this.challenge.pipe(
      filter(isDefined),
      switchMap((challenge) =>
        this.userService.isStarredChallenge(
          challenge.fullName.split('/')[0],
          challenge.name
        )
      ),
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
      tap((starred) => this.starred.next(starred)),
      switchMap(() => this.starred.asObservable())
    );
  }

  getStarred(): Observable<boolean> {
    return this.starred.asObservable();
  }

  toggleStarred(): Observable<boolean> {
    const data$ = combineLatest([this.challenge, this.starred]).pipe(take(1));

    const star$: Observable<boolean> = data$.pipe(
      filter(([_, starred]) => !starred),
      switchMap(([challenge, _]) => {
        if (challenge !== undefined) {
          return this.userService
            .starChallenge(challenge.fullName.split('/')[0], challenge.name)
            .pipe(mapTo(true));
        }
        return of(false);
      })
    );

    const unstar$: Observable<boolean> = data$.pipe(
      filter(([_, starred]) => starred),
      switchMap(([challenge, _]) => {
        if (challenge !== undefined) {
          return this.userService
            .unstarChallenge(challenge.fullName.split('/')[0], challenge.name)
            .pipe(mapTo(false));
        }
        return of(false);
      })
    );

    return merge(star$, unstar$).pipe(
      tap((starred) => this.starred.next(starred)),
      switchMap(() => this.starred.asObservable())
    );
  }
}
