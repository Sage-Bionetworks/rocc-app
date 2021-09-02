import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { MaterialModule } from '@shared/material/material.module';
import { NotFoundModule } from '@shared/not-found/not-found.module';
import { AccountComponent } from './account.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { OrgAccountComponent } from './org-account/org-account.component';
import { UserProfileBarComponent } from './user-account/user-profile-bar/user-profile-bar.component';
import { UserProfileOverviewComponent } from './user-account/user-profile-overview/user-profile-overview.component';
import { UserProfileChallengesComponent } from './user-account/user-profile-challenges/user-profile-challenges.component';

const routes: Routes = [{ path: '', component: AccountComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FooterModule,
    MaterialModule,
    NotFoundModule,
  ],
  declarations: [
    AccountComponent,
    UserAccountComponent,
    OrgAccountComponent,
    UserProfileBarComponent,
    UserProfileOverviewComponent,
    UserProfileChallengesComponent,
  ],
})
export class AccountModule {}
