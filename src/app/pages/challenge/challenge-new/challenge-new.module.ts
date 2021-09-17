import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule, FooterModule } from '@sage-bionetworks/sage-angular';
import { ChallengeNewComponent } from './challenge-new.component';
import { MaterialModule } from '@app/shared/material/material.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ChallengeNewComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AvatarModule,
    FooterModule,
    MaterialModule,
  ],
  declarations: [ChallengeNewComponent],
})
export class ChallengeNewModule {}
