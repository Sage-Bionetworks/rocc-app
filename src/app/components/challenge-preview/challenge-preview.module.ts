import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengePreviewComponent } from './challenge-preview.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ChallengePreviewComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ChallengePreviewComponent],
  providers: []
})
export class ChallengePreviewModule { }
