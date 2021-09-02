import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'rocc-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
})
export class OrganizationsComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  constructor() {}
}
