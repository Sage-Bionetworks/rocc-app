import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { ChallengesComponent } from './challenges.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { ChallengesRoutingModule } from './challenges-routing.module';

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
  providers: [],
  exports: []
})
export class ChallengesModule { }
