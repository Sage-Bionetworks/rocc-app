import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'rocc-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  constructor() {}
}
