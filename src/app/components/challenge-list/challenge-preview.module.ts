import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeListComponent } from './challenge-list.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ChallengeListComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ChallengeListComponent],
  providers: []
})
export class ChallengeListModule { }
