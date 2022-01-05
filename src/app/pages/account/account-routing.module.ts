import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';

const routes: Routes = [
  { path: '', component: AccountComponent },
  {
    path: ':challengeName',
    loadChildren: () => import('../challenge').then((m) => m.ChallengeModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
