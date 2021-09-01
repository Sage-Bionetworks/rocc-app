import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'rocc-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  constructor() {}

  ngOnInit(): void {
    console.log('account init');
  }
}
