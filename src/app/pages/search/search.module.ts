import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { MaterialModule } from '@shared/material/material.module';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  imports: [CommonModule, FooterModule, MaterialModule, SearchRoutingModule],
  declarations: [SearchComponent],
})
export class SearchModule {}
