import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'rocc-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  constructor() {}
}
