import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/auth/auth-guard.service';

export const routes: Routes = [
  // {
  //   path: 'challenges',
  //   loadChildren: () => import('./pages/challenges').then(m => m.ChallengesModule)
  // },
  // {
  //   path: 'organizations',
  //   loadChildren: () => import('./pages/organizations').then(m => m.OrganizationsModule)
  // },
  {
    path: 'about',
    loadChildren: () => import('./pages/about').then(m => m.AboutModule),
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search').then(m => m.SearchModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/signin').then(m => m.SigninModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup').then(m => m.SignupModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./pages/challenge/challenge-new').then(m => m.ChallengeNewModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications').then(m => m.NotificationsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings').then(m => m.SettingsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'orgs',
    loadChildren: () => import('./pages/organization').then(m => m.OrganizationModule)
  },
  // {
  //   path: '404',
  //   loadChildren: () => import('./pages/page-not-found').then(m => m.PageNotFoundModule)
  // },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pages/homepage').then(m => m.HomepageModule)
  },
  {
    path: ':login',
    loadChildren: () => import('./pages/account').then(m => m.AccountModule),
  },
  // {
  //   path: ':username',
  //   loadChildren: () => import('./pages/profile').then(m => m.ProfileModule),
  //   // canActivate: [CanActivateUser]
  // },



//   {path: 'categories', redirectTo: '/components/categories'},
//   {path: 'cdk', pathMatch: 'full', redirectTo: '/cdk/categories'},
//   {path: 'components', pathMatch: 'full', redirectTo: '/components/categories'},
//   {
//     path: 'guides',
//     loadChildren: () => import('./pages/guide-list').then(m => m.GuideListModule)
//   },
  // Since https://github.com/angular/components/pull/9574, the cdk-table guide became the overview
  // document for the cdk table. To avoid any dead / broken links, we redirect to the new location.
//   {path: 'guide/cdk-table', redirectTo: '/cdk/table/overview'},
//   {
//     path: 'guide/:id',
//     loadChildren: () => import('./pages/guide-viewer').then(m => m.GuideViewerModule)
//   },
  // Needs to be defined before `:section` so it gets picked first when redirecting a missing page.
//   {
//     path: '404',
//     loadChildren: () => import('./pages/not-found').then(m => m.NotFoundModule)
//   },
//   {
//     path: ':section',
//     canActivate: [CanActivateComponentSidenav],
//     loadChildren: () =>
//       import('./pages/component-sidenav/component-sidenav').then(m => m.ComponentSidenavModule)
//   },
  {
    path: '**', redirectTo: '/404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
