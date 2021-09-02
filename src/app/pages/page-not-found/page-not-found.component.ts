import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'rocc-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  constructor() {}
}
