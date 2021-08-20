import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'rocc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  constructor() {}
}
