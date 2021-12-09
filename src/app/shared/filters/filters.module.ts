import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ButtonToggleFilterComponent } from './button-toggle-filter/button-toggle-filter.component';
import { CheckboxFilterComponent } from './checkbox-filter/checkbox-filter.component';
import { DateRangeFilterComponent } from './date-range-filter/date-range-filter.component';
import { RadioButtonFilterComponent } from './radio-button-filter/radio-button-filter.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { SelectFilterComponent } from './select-filter/select-filter.component';
import { SortFilterComponent } from './sort-filter/sort-filter.component';
import { SearchDropdownFilterComponent } from './search-dropdown-filter/search-dropdown-filter.component';
import { PrimengModule } from '../primeng/primeng.module';
import { AvatarModule } from '@sage-bionetworks/sage-angular/src/lib/avatar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    PrimengModule,
    AvatarModule,
  ],
  declarations: [
    ButtonToggleFilterComponent,
    CheckboxFilterComponent,
    DateRangeFilterComponent,
    RadioButtonFilterComponent,
    SearchFilterComponent,
    SelectFilterComponent,
    SortFilterComponent,
    SearchDropdownFilterComponent,
  ],
  exports: [
    ButtonToggleFilterComponent,
    CheckboxFilterComponent,
    DateRangeFilterComponent,
    RadioButtonFilterComponent,
    SearchFilterComponent,
    SelectFilterComponent,
    SortFilterComponent,
    SearchDropdownFilterComponent,
  ],
})
export class FiltersModule {}
