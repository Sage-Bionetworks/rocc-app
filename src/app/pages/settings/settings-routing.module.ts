import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@shared/auth/auth-guard.service';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  { path: '', component: SettingsComponent, canActivate: [AuthGuard] },
  // {
  //   path: ':challengeName',
  //   loadChildren: () => import('../challenge').then((m) => m.ChallengeModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
