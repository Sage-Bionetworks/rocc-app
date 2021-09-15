import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { MaterialModule } from '@shared/material/material.module';
import { FiltersModule } from '@shared/filters/filters.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { ChallengeSearchComponent } from './challenge-search/challenge-search.component';

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    MaterialModule,
    FiltersModule,
    SearchRoutingModule,
  ],
  declarations: [SearchComponent, ChallengeSearchComponent],
})
export class SearchModule {}
