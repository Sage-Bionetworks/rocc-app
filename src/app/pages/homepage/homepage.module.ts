import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { HomepageComponent } from './homepage.component';
import { MaterialsModule } from 'src/app/materials/materials.module';

const routes: Routes = [
  { path: '', component: HomepageComponent }
];

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FooterModule,
    MaterialsModule
  ],
  exports: [HomepageComponent]
})
export class HomepageModule { }
