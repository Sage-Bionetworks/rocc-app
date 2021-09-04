import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallengeNewComponent } from './challenge-new/challenge-new.component';
import { ChallengeOverviewComponent } from './challenge-overview/challenge-overview.component';
import { ChallengeSettingsComponent } from './challenge-settings/challenge-settings.component';
import { ChallengeComponent } from './challenge.component';

const routes: Routes = [
  {
    path: '',
    component: ChallengeComponent,
    children: [
      {
        path: '',
        component: ChallengeOverviewComponent,
      },
      {
        path: 'settings',
        component: ChallengeSettingsComponent,
      },
      {
        path: 'overview',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChallengeRoutingModule {}
