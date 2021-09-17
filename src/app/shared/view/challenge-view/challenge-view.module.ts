import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeViewComponent } from '@shared/view/challenge-view/challenge-view.component';
import { MaterialModule } from '@shared/material/material.module';

@NgModule({
  declarations: [ChallengeViewComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ChallengeViewComponent],
  providers: [],
})
export class ChallengeViewModule {}
