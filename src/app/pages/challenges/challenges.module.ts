import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { MaterialModule } from '../../components/material/material.module';
import { ChallengesComponent } from './challenges.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { ChallengeListItemComponent } from './challenge-list-item/challenge-list-item.component';
import { ChallengesRoutingModule } from './challenges-routing.module';
import { ChallengeDataService } from './challenge-data.service';
import { ChallengeNewComponent } from './challenge-new/challenge-new.component';
import { ChallengeViewComponent } from './challenge-view/challenge-view.component';

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
    ChallengeListItemComponent,
    ChallengeNewComponent,
    ChallengeViewComponent
  ],
  providers: [
    ChallengeDataService
  ],
  exports: []
})
export class ChallengesModule { }
