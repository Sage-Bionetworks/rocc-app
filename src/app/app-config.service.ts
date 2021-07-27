// import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConfig, APP_CONFIG } from './app.config';
// import { Observable } from 'rxjs';
// import { shareReplay, tap } from 'rxjs/operators';

// export enum Environment {
//   Production = 'prod',
//   Staging = 'staging',
//   Test = 'test',
//   Development = 'dev',
//   Local = 'local',
// }

// export interface Configuration {
//   type: Environment;
//   apiUrl: string;
// }

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  // private readonly configUrl = 'config/config.json';
  // private configuration$!: Observable<Configuration>;

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {}

  getAppConfig(): Observable<AppConfig> {
    return of(this.config);
  }

  // public loadAppConfig(): Observable<Configuration> {
  //   if (!this.configuration$) {
  //     this.configuration$ = this.http.get<Configuration>(this.configUrl).pipe(
  //       tap(res => console.log('Reading configuration', res)),
  //       shareReplay(1)
  //     );
  //   }
  //   return this.configuration$;
  // }
}
