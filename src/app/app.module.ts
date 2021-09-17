import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NavbarModule,
  FooterModule,
  PageTitleModule,
} from '@sage-bionetworks/sage-angular';
import {
  ApiModule,
  Configuration,
  ConfigurationParameters,
} from '@sage-bionetworks/rocc-client-angular';
import { BASE_PATH } from '@sage-bionetworks/rocc-client-angular';
import { DatabaseSeedModule } from '@shared/database-seed/database-seed.module';
import { FiltersModule } from '@shared/filters/filters.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppConfig, APP_CONFIG } from './app.config';
import { TokenService } from '@shared/auth/token.service';
import { CardPreviewModule } from '@shared/card-preview/card-preview.module';

// export function apiConfigFactory(): Configuration {
//   const params: ConfigurationParameters = {
//     // set configuration parameters here.
//     credentials: {
//       "BearerAuth": () =>
//     }
//   };
//   return new Configuration(params);
// }

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NavbarModule,
    FooterModule,
    ApiModule,
    // ApiModule.forRoot(apiConfigFactory),
    DatabaseSeedModule,
    FiltersModule,
    PageTitleModule,
    CardPreviewModule,
  ],
  declarations: [AppComponent],
  providers: [
    // {
    //   provide: BASE_PATH,
    //   useFactory: (config: AppConfig) => config.apiUrl,
    //   deps: [APP_CONFIG],
    // },
    {
      provide: Configuration,
      useFactory: (config: AppConfig, tokenService: TokenService) =>
        new Configuration({
          credentials: {
            BearerAuth: () => tokenService.getToken(),
          },
          basePath: config.apiUrl,
        }),
      deps: [APP_CONFIG, TokenService],
      multi: false,
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
