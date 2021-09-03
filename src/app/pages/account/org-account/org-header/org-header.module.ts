import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgHeaderComponent } from './org-header.component';

@NgModule({
  imports: [CommonModule],
  declarations: [OrgHeaderComponent],
  exports: [OrgHeaderComponent]
})
export class OrgHeaderModule {}
