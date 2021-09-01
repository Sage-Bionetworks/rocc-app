import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { MaterialModule } from '@shared/material/material.module';
import { FiltersModule } from '@shared/filters/filters.module';
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
    FormsModule,
    ReactiveFormsModule,
    FooterModule,
    MaterialModule,
    FiltersModule,
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
