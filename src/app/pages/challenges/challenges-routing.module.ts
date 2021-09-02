import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallengesComponent } from './challenges.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { ChallengeNewComponent } from './challenge-new/challenge-new.component';
// import { ChallengeViewComponent } from './challenge-view/challenge-view.component';

const routes: Routes = [
  {
    path: '',
    component: ChallengesComponent,
    children: [
      {
        path: 'new',
        component: ChallengeNewComponent,
      },
      // {
      //   path: '',
      //   component: ChallengeComponent,
      // },
      // {
      //   path: ':id',
      //   component: ChallengeViewComponent,
      // },
      {
        path: '',
        component: ChallengeListComponent,
      },
      //   {
      //     path: '', redirectTo: 'casual', pathMatch: 'full'
      //   },
      //   { path: '**', component:  Page404balanceComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChallengesRoutingModule {}
