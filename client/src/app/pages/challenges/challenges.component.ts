import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'rocc-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  constructor() { }

  ngOnInit(): void {
  }
}
