import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengePreviewComponent } from './challenge-preview.component';
import { MaterialsModule } from 'src/app/materials/materials.module';

@NgModule({
  declarations: [ChallengePreviewComponent],
  imports: [
    CommonModule,
    MaterialsModule
  ],
  exports: [ChallengePreviewComponent],
  providers: []
})
export class ChallengePreviewModule { }
