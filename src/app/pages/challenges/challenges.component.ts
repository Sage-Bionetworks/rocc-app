import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'rocc-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss'],
})
export class ChallengesComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  constructor() {}
}
