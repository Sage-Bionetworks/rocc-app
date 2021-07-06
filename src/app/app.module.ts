import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarModule, FooterModule } from '@sage-bionetworks/sage-angular';
import { ApiModule, Configuration, ConfigurationParameters } from '@sage-bionetworks/rocc-client-angular';
import { BASE_PATH } from '@sage-bionetworks/rocc-client-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DatabaseSeedModule } from './components/database-seed/database-seed.module';
import { environment } from '../environments/environment';
import { ChallengesModule } from './challenges/challenges.module';
// import { ChallengeListComponent } from './challenge-list/challenge-list.component';
// import { ChallengeListComponent } from './pages/challenge-list/challenge-list.component';

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
    ChallengesModule
  ],
  declarations: [
    AppComponent,
    // ChallengeComponent,
    // ChallengeListComponent
    // ChallengeListComponent
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.apiBasePath }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
