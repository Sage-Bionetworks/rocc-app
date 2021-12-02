import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
@NgModule({
  declarations: [],
  imports: [CommonModule, ButtonModule, MultiSelectModule],
  exports: [ButtonModule, MultiSelectModule],
})
export class PrimengModule {}
