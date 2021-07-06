import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallengesComponent } from './challenges.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component'
// import { BalanceComponent } from './balance.component';
// import { CasualComponent } from './casual/casual.component';
// import { EarnedComponent } from './earned/earned.component';
// import { Page404balanceComponent } from './page404balance/page404balance.component';


const routes: Routes = [
  {
    path: '',
    component: ChallengesComponent,
    children: [
      {
        path: '',
        component: ChallengeListComponent,
      },
      //   {
      //     path: 'earned', component: EarnedComponent
      //   },
      //   {
      //     path: '', redirectTo: 'casual', pathMatch: 'full'
      //   },
      //   { path: '**', component:  Page404balanceComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengesRoutingModule { }
