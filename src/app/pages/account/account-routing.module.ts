import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
// import { ChallengesComponent } from './challenges.component';
// import { ChallengeListComponent } from './challenge-list/challenge-list.component';
// import { ChallengeNewComponent } from './challenge-new/challenge-new.component';
// import { ChallengeViewComponent } from './challenge-view/challenge-view.component';

const routes: Routes = [
  { path: '', component: AccountComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
