import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AvatarModule, FooterModule } from '@sage-bionetworks/sage-angular';
import { HomepageComponent } from './homepage.component';
import { MaterialModule } from 'src/app/components/material/material.module';

const routes: Routes = [
  { path: '', component: HomepageComponent }
];

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FooterModule,
    MaterialModule,
    AvatarModule
  ],
  exports: [HomepageComponent]
})
export class HomepageModule { }
