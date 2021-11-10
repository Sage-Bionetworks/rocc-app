import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrgChallengesComponent } from './org-challenges/org-challenges.component';
import { OrganizationComponent } from './organization.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationComponent,
    children: [
      {
        path: 'challenges',
        component: OrgChallengesComponent,
      },
      {
        path: '',
        redirectTo: 'challenges',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
