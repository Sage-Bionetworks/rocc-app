import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleViewComponent } from './people-view.component';
import { MaterialModule } from '@shared/material/material.module';

@NgModule({
  declarations: [PeopleViewComponent],
  imports: [CommonModule, MaterialModule],
  exports: [PeopleViewComponent],
})
export class PeopleViewModule {}
