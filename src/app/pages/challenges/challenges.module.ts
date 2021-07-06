import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { ChallengesComponent } from './challenges.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { ChallengesRoutingModule } from './challenges-routing.module';
import { ChallengeDataService } from './challenge-data.service';

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    ChallengesRoutingModule
  ],
  declarations: [
    ChallengesComponent,
    ChallengeListComponent
  ],
  providers: [
    ChallengeDataService
  ],
  exports: []
})
export class ChallengesModule { }
