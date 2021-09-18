import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleViewComponent } from './people-view.component';
import { MaterialModule } from '@shared/material/material.module';
import { AvatarModule } from '@sage-bionetworks/sage-angular/src/lib/avatar';

@NgModule({
  declarations: [PeopleViewComponent],
  imports: [CommonModule, MaterialModule, AvatarModule],
  exports: [PeopleViewComponent],
})
export class PeopleViewModule {}
