import { Component, HostBinding, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rocc-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  // TODO: remove once login/user is implemented
  @Input()
  user = true;
  username = 'rocc-user';

  constructor() {}

  ngOnInit(): void {}
}
