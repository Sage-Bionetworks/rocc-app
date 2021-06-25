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
import { PreviewCardComponent } from './components/preview-card/preview-card.component';
import { MatCardModule} from '@angular/material/card'; 
import {MatButtonModule} from '@angular/material/button' 

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
  };
  return new Configuration(params);
}

@NgModule({
  declarations: [
    AppComponent,
    PreviewCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NavbarModule,
    FooterModule,
    ApiModule.forRoot(apiConfigFactory),
    DatabaseSeedModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.apiBasePath }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
