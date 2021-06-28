import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewCardComponent } from './preview-card.component';
import { MaterialsModule } from 'src/app/materials/materials.module';

@NgModule({
  declarations: [PreviewCardComponent],
  imports: [
    CommonModule,
    MaterialsModule
  ],
  exports: [PreviewCardComponent],
  providers: []
})
export class PreviewCardModule { }
