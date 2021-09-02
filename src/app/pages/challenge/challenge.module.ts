import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { MaterialModule } from '@shared/material/material.module';
import { ChallengeComponent } from './challenge.component';
import { ChallengeRoutingModule } from './challenge-routing.module';
import { NotFoundModule } from '@app/shared/not-found/not-found.module';

@NgModule({
  imports: [
    CommonModule,
    ChallengeRoutingModule,
    FooterModule,
    MaterialModule,
    NotFoundModule,
  ],
  declarations: [ChallengeComponent],
})
export class ChallengeModule {}
