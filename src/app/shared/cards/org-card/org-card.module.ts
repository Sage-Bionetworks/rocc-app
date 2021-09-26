import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgCardComponent } from './org-card.component';
import { MaterialModule } from '@shared/material/material.module';

@NgModule({
  declarations: [OrgCardComponent],
  imports: [CommonModule, MaterialModule],
  exports: [OrgCardComponent],
})
export class OrgCardModule {}
