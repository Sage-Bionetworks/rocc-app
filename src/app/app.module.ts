import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarModule, FooterModule } from '@sage-bionetworks/sage-angular';
import {
  ApiModule,
  Configuration,
  ConfigurationParameters,
} from '@sage-bionetworks/rocc-client-angular';
import { BASE_PATH } from '@sage-bionetworks/rocc-client-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DatabaseSeedModule } from './components/database-seed/database-seed.module';
import { FiltersModule } from './components/filters/filters.module';
import { AppConfigService } from './app-config.service';
import { AppConfig, APP_CONFIG } from './app.config';
import { PageTitleModule } from './components/page-title/page-title.module';

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
  };
  return new Configuration(params);
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NavbarModule,
    FooterModule,
    ApiModule.forRoot(apiConfigFactory),
    DatabaseSeedModule,
    FiltersModule,
    PageTitleModule
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: BASE_PATH,
      useFactory: (config: AppConfig) => config.apiUrl,
      deps: [APP_CONFIG],
    },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (appConfigService: AppConfigService) => () =>
    //     appConfigService.loadAppConfig().toPromise(),
    //   deps: [AppConfigService, APP_CONFIG],
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
