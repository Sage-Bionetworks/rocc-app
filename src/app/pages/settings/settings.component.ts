import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'rocc-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  constructor() {}

  ngOnInit(): void {}
}
