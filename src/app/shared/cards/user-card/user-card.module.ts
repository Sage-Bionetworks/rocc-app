import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './user-card.component';
import { MaterialModule } from '@shared/material/material.module';
import { AvatarModule } from '@sage-bionetworks/sage-angular/src/lib/avatar';

@NgModule({
  declarations: [UserCardComponent],
  imports: [CommonModule, MaterialModule, AvatarModule],
  exports: [UserCardComponent],
})
export class UserCardModule {}
