import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgCardComponent } from './org-card.component';
import { MaterialModule } from '@shared/material/material.module';
import { AvatarModule } from '@sage-bionetworks/sage-angular/src/lib/avatar';

@NgModule({
  declarations: [OrgCardComponent],
  imports: [CommonModule, MaterialModule, AvatarModule],
  exports: [OrgCardComponent],
})
export class OrgCardModule {}
