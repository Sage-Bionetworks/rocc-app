import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConfig, APP_CONFIG } from './app.config';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private readonly appConfig!: AppConfig;

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {
    this.appConfig = config;
  }

  getAppConfig(): Observable<AppConfig> {
    return of(this.appConfig);
  }
}
