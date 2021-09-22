import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeCardComponent } from '@app/shared/cards/challenge-card/challenge-card.component';
import { MaterialModule } from '@shared/material/material.module';

@NgModule({
  declarations: [ChallengeCardComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ChallengeCardComponent],
  providers: [],
})
export class ChallengeCardModule {}
