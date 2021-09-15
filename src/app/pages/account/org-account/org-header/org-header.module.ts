import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { OrgHeaderComponent } from './org-header.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [OrgHeaderComponent],
  exports: [OrgHeaderComponent],
})
export class OrgHeaderModule {}
