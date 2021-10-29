import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { MaterialModule } from '@shared/material/material.module';
import { NotFoundModule } from '@shared/not-found/not-found.module';
import { AccountComponent } from './account.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { OrgAccountComponent } from './org-account/org-account.component';
import { UserProfileBarComponent } from './user-account/user-profile-bar/user-profile-bar.component';
import { UserProfileOverviewComponent } from './user-account/user-profile-overview/user-profile-overview.component';
import { UserProfileChallengesComponent } from './user-account/user-profile-challenges/user-profile-challenges.component';
import { AccountRoutingModule } from './account-routing.module';
import { AvatarModule } from '@sage-bionetworks/sage-angular/src/lib/avatar';
import { OrgHeaderModule } from './org-account/org-header/org-header.module';
import { OrgOverviewComponent } from './org-account/org-overview/org-overview.component';
import { UserProfileStarredComponent } from './user-account/user-profile-starred/user-profile-starred.component';
import { OrgCardModule } from '@shared/cards/org-card/org-card.module';
import { ChallengeCardModule } from '@app/shared/cards/challenge-card/challenge-card.module';

@NgModule({
  imports: [
    ChallengeCardModule,
    CommonModule,
    FooterModule,
    MaterialModule,
    NotFoundModule,
    AccountRoutingModule,
    OrgHeaderModule,
    AvatarModule,
    OrgCardModule,
  ],
  declarations: [
    AccountComponent,
    UserAccountComponent,
    OrgAccountComponent,
    UserProfileBarComponent,
    UserProfileOverviewComponent,
    UserProfileChallengesComponent,
    OrgOverviewComponent,
    UserProfileStarredComponent,
  ],
})
export class AccountModule {}
