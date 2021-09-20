import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { MaterialModule } from '@shared/material/material.module';
import { ChallengeComponent } from './challenge.component';
import { ChallengeRoutingModule } from './challenge-routing.module';
import { NotFoundModule } from '@app/shared/not-found/not-found.module';
import { ChallengeHeaderComponent } from './challenge-header/challenge-header.component';
import { ChallengeOverviewComponent } from './challenge-overview/challenge-overview.component';
import { ChallengeSettingsComponent } from './challenge-settings/challenge-settings.component';
import { ChallengeNewComponent } from './challenge-new/challenge-new.component';
import { AuthModule } from '@shared/auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    ChallengeRoutingModule,
    FooterModule,
    MaterialModule,
    NotFoundModule,
    AuthModule
  ],
  declarations: [
    ChallengeComponent,
    ChallengeHeaderComponent,
    ChallengeOverviewComponent,
    ChallengeSettingsComponent,
  ],
})
export class ChallengeModule {}
