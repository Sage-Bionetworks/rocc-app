import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { NotFoundComponent } from './not-found.component';
import { MaterialsModule } from 'src/app/materials/materials.module';

const routes: Routes = [
  { path: '', component: NotFoundComponent }
];

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FooterModule,
    MaterialsModule
  ],
  exports: [NotFoundComponent]
})
export class NotFoundModule {}
