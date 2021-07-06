import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { ChallengesComponent } from './challenges.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { ChallengesRoutingModule } from './challenges-routing.module';

// export const routes: Routes = [
//   {
//     path: 'challenges',
//     component: ChallengeListComponent,
//     // canActivate: [AuthGuard],
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    ChallengesRoutingModule
  ],
  declarations: [
    ChallengesComponent,
    ChallengeListComponent
  ],
  providers: [],
  exports: []
})
export class ChallengesModule { }
