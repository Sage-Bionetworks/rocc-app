import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { MaterialModule } from '@shared/material/material.module';
import { NotificationsComponent } from './notifications.component';

const routes: Routes = [
  { path: '', component: NotificationsComponent }
];

@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FooterModule,
    MaterialModule
  ],
  exports: [NotificationsComponent]
})
export class NotificationsModule { }
