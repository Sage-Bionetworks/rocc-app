import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'rocc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  constructor() { }

  ngOnInit(): void {

  }

}
