import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationsComponent } from './organizations.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationNewComponent } from './organization-new/organization-new.component';
import { OrganizationViewComponent } from './organization-view/organization-view.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationsComponent,
    children: [
      {
        path: 'new', component: OrganizationNewComponent
      },
      {
        path: ':id',
        component: OrganizationViewComponent,
      },
      {
        path: '',
        component: OrganizationListComponent,
      }
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
export class OrganizationsRoutingModule {}
