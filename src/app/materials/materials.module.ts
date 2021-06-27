import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatTabsModule]
})
export class MaterialsModule { }
