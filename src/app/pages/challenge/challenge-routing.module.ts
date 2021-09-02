import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallengeOverviewComponent } from './challenge-overview/challenge-overview.component';
import { ChallengeSettingsComponent } from './challenge-settings/challenge-settings.component';
import { ChallengeComponent } from './challenge.component';

const routes: Routes = [
  {
    path: '',
    component: ChallengeComponent,
    children: [
      {
        path: 'settings',
        component: ChallengeSettingsComponent,
      },
      {
        path: '',
        component: ChallengeOverviewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChallengeRoutingModule {}
