import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPreviewComponent } from '@shared/card-preview/card-preview.component';
import { MaterialModule } from '@shared/material/material.module';

@NgModule({
  declarations: [CardPreviewComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CardPreviewComponent],
  providers: [],
})
export class CardPreviewModule {}
