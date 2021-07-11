import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ButtonToggleFilterComponent } from './button-toggle-filter/button-toggle-filter.component';
import { CheckboxFilterComponent } from './checkbox-filter/checkbox-filter.component';
import { RadioButtonFilterComponent } from './radio-button-filter/radio-button-filter.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { SelectFilterComponent } from './select-filter/select-filter.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MaterialModule],
  declarations: [
    ButtonToggleFilterComponent,
    CheckboxFilterComponent,
    RadioButtonFilterComponent,
    SearchFilterComponent,
    SelectFilterComponent,
  ],
  exports: [
    ButtonToggleFilterComponent,
    CheckboxFilterComponent,
    RadioButtonFilterComponent,
    SearchFilterComponent,
    SelectFilterComponent,
  ],
})
export class FiltersModule {}
