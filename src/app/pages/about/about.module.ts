import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AvatarModule, FooterModule } from '@sage-bionetworks/sage-angular';
import { AboutComponent } from './about.component';
import { MaterialModule } from '@shared/material/material.module';

const routes: Routes = [
  { path: '', component: AboutComponent }
];

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FooterModule,
    MaterialModule,
    AvatarModule,
  ],
  exports: [AboutComponent]
})
export class AboutModule { }
