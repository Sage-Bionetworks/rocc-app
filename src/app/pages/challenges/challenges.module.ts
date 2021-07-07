import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { MaterialModule } from '../../components/material/material.module';
import { ChallengesComponent } from './challenges.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { ChallengesRoutingModule } from './challenges-routing.module';
import { ChallengeDataService } from './challenge-data.service';
import { ChallengeNewComponent } from './challenge-new/challenge-new.component';

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    MaterialModule,
    ChallengesRoutingModule
  ],
  declarations: [
    ChallengesComponent,
    ChallengeListComponent,
    ChallengeNewComponent
  ],
  providers: [
    ChallengeDataService
  ],
  exports: []
})
export class ChallengesModule { }
