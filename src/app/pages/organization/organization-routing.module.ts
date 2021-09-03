import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrgChallengesComponent } from './org-challenges/org-challenges.component';
import { OrgPeopleComponent } from './org-people/org-people.component';
import { OrgSettingsComponent } from './org-settings/org-settings.component';
import { OrganizationComponent } from './organization.component';
// import { AccountComponent } from './account.component';

const routes: Routes = [
  {
    path: ':orgName',
    component: OrganizationComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: ':orgName',
      // },
      {
        path: 'challenges',
        component: OrgChallengesComponent,
      },
      {
        path: 'people',
        component: OrgPeopleComponent,
      },
      {
        path: 'settings',
        component: OrgSettingsComponent,
      },
      {
        path: '**',
        redirectTo: '/404', // TODO Is there a way to redirect to the
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
