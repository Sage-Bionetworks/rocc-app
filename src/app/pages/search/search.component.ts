import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'rocc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;
}
