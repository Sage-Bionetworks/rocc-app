import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { ChallengeListComponent } from './challenge-list.component';
// import { ChallengePreviewModule } from 'src/app/components/challenge-preview/challenge-preview.module';

const routes: Routes = [
  { path: '', component: ChallengeListComponent }
];

@NgModule({
  declarations: [ChallengeListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FooterModule,
    // ChallengePreviewModule
  ],
  exports: [ChallengeListComponent]
})
export class ChallengeListModule {}
