import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

export enum EnvironmentType {
  Production = 'prod',
  Staging = 'staging',
  Test = 'test',
  Development = 'dev',
  Local = 'local',
}

export interface Environment {
  type: EnvironmentType;
  apiUrl: string;
}

@Injectable({ providedIn: 'root' })
export class AppEnvironmentService {
  private readonly configUrl = 'assets/environments/environment.json';
  private configuration$!: Observable<Environment>;

  constructor(private http: HttpClient) {}

  public load(): Observable<Environment> {
    if (!this.configuration$) {
      this.configuration$ = this.http.get<Environment>(this.configUrl).pipe(
        tap(res => console.log('Reading enviornment', res)),
        shareReplay(1)
      );
    }
    return this.configuration$;
  }
}
